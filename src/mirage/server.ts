import { createServer, Model } from "miragejs";
import songs from "./data/songs.json";
import { v4 as uuidv4 } from "uuid";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment: environment,
    namespace: "api",
    timing: 1000,
    logging: true,
    models: {
      song: Model,
    },
    seeds(server) {
      const transformedSongs = songs.map((song: any) => ({
        id: song.id,
        title: song.name,
        artist: song.artist,
        album: song.album,
        year: song.year,
        images: {
          small: song.images.small,
          medium: song.images.medium,
          large: song.images.large,
        },
        previewUrl: song.previewUrl,
        duration: formatDuration(song.duration), // Convert number to string format
      }));

      server.db.loadData({ songs: transformedSongs });
    },
    routes() {
      // GET all songs
      this.get("/songs", (schema, request) => {
        // Pagination (limit, offset) (optional)
        const limit = parseInt(request.queryParams.limit as string) || 0;
        const page = parseInt(request.queryParams.page as string) || 1;

        if (limit) {
          const offset = (page - 1) * limit;
          const paginatedSongs = schema.db.songs.slice(offset, offset + limit);

          return {
            songs: paginatedSongs,
            total: schema.db.songs.length,
            page: page,
            limit: limit,
          };
        }

        return {
          songs: schema.db.songs,
          total: schema.db.songs.length,
          page: 1,
          limit: 0,
        };
      });

      // GET song by id
      this.get("/songs/:id", (schema, request) => {
        const id = request.params.id;
        return schema.db.songs.find(id);
      });

      // POST new song
      this.post("/songs", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.db.songs.insert({ ...attrs, id: uuidv4() });
      });

      // PUT update song
      this.put("/songs/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        return schema.db.songs.update(id, attrs);
      });

      // DELETE song
      this.delete("/songs/:id", (schema, request) => {
        const id = request.params.id;
        schema.db.songs.remove(id);
        return { success: true };
      });
    },
  });
}

// Helper function to convert duration from milliseconds to MM:SS format
function formatDuration(durationMs: number): string {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
