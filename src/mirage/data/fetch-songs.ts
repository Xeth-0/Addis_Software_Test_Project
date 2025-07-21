/**
 * Fetch iTunes Top 100, + a handful of albums that I like using their Search API.
 */

import fs from "fs";
import path from "path";
import fetch from "node-fetch";

function getArtworkUrl(url: string, size: number) {
  // GPT Generated (slightly improved by me). Apple music returns 3 images of pre-determined resolutions.
  // These are quite small, and I found that replacing the size with a larger one works directly from their API.
  // This function replaces the size of the image in the url of the API response with another one.
  return url.replace(
    /\/\d+x\d+bb\.(png|jpg|jpeg|gif|svg|webp)$/,
    `/${size}x${size}bb.$1`
  );
}


async function fetchITunesTop100() {
  function formatItunesSongs(json: any) {
    return json.feed.entry.map((e: any) => ({
      id: e.id.attributes["im:id"],
      name: e["im:name"].label,
      artist: e["im:artist"].label,
      album: e["im:collection"]["im:name"]?.label || "Single",
      year: new Date(e["im:releaseDate"]?.label).getFullYear(),
      previewUrl: e?.link?.find((l: any) => l.attributes.rel === "alternate")
        ?.attributes.href,
      images: {
        small: getArtworkUrl(e["im:image"][0].label, 60),
        medium: getArtworkUrl(e["im:image"][1].label, 420),
        large: getArtworkUrl(e["im:image"][2].label, 560),
      },
      price: e["im:price"].label,
      genre: e?.category?.attributes?.term,
      link: e?.link?.find((l: any) => l.attributes.rel === "alternate")
        ?.attributes.href,
      duration: e?.link[1]["im:duration"]?.label,
    }));
  }

  // Fetching the top 100 songs from iTunes.
  const url = "https://itunes.apple.com/us/rss/topsongs/limit=100/json";
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });
  if (!res.ok) {
    console.error(`Failed to fetch iTunes Top 100: ${res.statusText}`);
    console.log("Using local backup instead");
    const data = JSON.parse(
      fs.readFileSync(
        path.join(__dirname, "itunes_top100_backup_7-20-2025.json"),
        "utf8"
      )
    );
    return formatItunesSongs(data);
  }

  const json = await res.json();
  return formatItunesSongs(json);
}

async function fetchAlbumSongs(
  albumName: string,
  albumArtist: string,
  limit = 50
) {
  const params = new URLSearchParams({
    term: `${albumName} ${albumArtist}`,
    entity: "album",
    limit: "1",
  });
  const url = `https://itunes.apple.com/search?${params}`;
  console.log(`Fetching songs for album: ${albumName} from: ${url}`);

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`Failed to fetch album: ${res.statusText}`);
    return null;
  }

  const { results: albums } = (await res.json()) as any;
  if (!albums || albums.length === 0) {
    console.error(`No albums found for: ${albumName}`);
    return null;
  }
  const albumId = albums[0].collectionId;

  // Search for the songs in the album now.
  const songSearchParams = new URLSearchParams({
    id: albumId.toString(),
    entity: "song",
    limit: limit.toString(),
  });
  const songSearchUrl = `https://itunes.apple.com/lookup?${songSearchParams}`;
  console.log(`Fetching songs for album: ${albumName} from: ${songSearchUrl}`);

  const songRes = await fetch(songSearchUrl);
  if (!songRes.ok) {
    console.error(
      `Failed to fetch songs for album: ${albumName}: ${songRes.statusText}`
    );
    return null;
  }

  const { results: songs } = (await songRes.json()) as any;

  // Filter out the album entry (first result) and only keep actual songs
  const songResults = songs.filter((result: any) => result.kind === "song");

  return songResults.map((result: any) => {
    return {
      id: result.trackId.toString(),
      name: result.trackName,
      artist: result.artistName,
      album: result.collectionName,
      year: new Date(result.releaseDate).getFullYear(),
      previewUrl: result.previewUrl,
      images: {
        small: getArtworkUrl(result.artworkUrl60, 60),
        medium: getArtworkUrl(result.artworkUrl100, 420),
        large: getArtworkUrl(result.artworkUrl100, 560),
      },
      price: result.trackPrice,
      genre: result.primaryGenreName,
      duration: result.trackTimeMillis,
    };
  });
}

// Runner
(async () => {
  // My list of albums. Just to have some songs i like there (and for the thumbnails for visuals).
  const albums = [
    { title: "Let God Sort Em Out", artist: "Clipse" },
    { title: "College Dropout", artist: "Kanye West" },
    { title: "11:11", artist: "Chris Brown" },
    { title: "DAMN.", artist: "Kendrick Lamar" },
    { title: "To Pimp a Butterfly", artist: "Kendrick Lamar" },
    { title: "Take Care", artist: "Drake" },
    { title: "Good Kid, M.A.A.D City", artist: "Kendrick Lamar" },
  ];

  // Start with the albums, then do the top 100.
  const albumSongsResults = await Promise.all(
    albums.map((album) => fetchAlbumSongs(album.title, album.artist))
  );
  const top100Songs = await fetchITunesTop100();

  // Filter out null results and flatten the album songs arrays
  const albumSongs = albumSongsResults
    .filter((result): result is any[] => result !== null)
    .flat();

  const songs = [...albumSongs, ...top100Songs];

  // Saving the results to a json file.
  fs.writeFileSync(
    path.join(__dirname, "songs.json"),
    JSON.stringify(songs, null, 2)
  );

  console.log("Done!");
})();
