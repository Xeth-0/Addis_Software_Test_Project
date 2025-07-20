import { createServer, Model } from "miragejs";
import { mockSongs } from "./data/songsMockData";
import songs from "./data/songs.json";

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
        title: song.name, // Map 'name' to 'title'
        artist: song.artist,
        album: song.album,
        year: song.year,
        thumbnail: song.artwork, // Map 'artwork' to 'thumbnail'
        duration: formatDuration(song.duration), // Convert number to string format
      }));
      
      server.db.loadData({ songs: transformedSongs });
    },
    routes() {
      // GET all songs
      this.get("/songs", (schema) => {
        return schema.db.songs;
      });
      
      // GET song by id
      this.get("/songs/:id", (schema, request) => {
        const id = request.params.id;
        return schema.db.songs.find(id);
      });
      
      // POST new song
      this.post("/songs", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.db.songs.insert(attrs);
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
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
