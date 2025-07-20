import { createServer } from "miragejs";
import { mockSongs } from "./data/songsMockData";

export function makeServer() {
  return createServer({
    urlPrefix: "http://localhost:3000/api",
    namespace: "api",
    timing: 1000,
    environment: "development",
    logging: true,
    routes() {
      this.get("/songs", () => {
        return {
          songs: [
            ...mockSongs,
            ...mockSongs,
            ...mockSongs,
            ...mockSongs,
            ...mockSongs,
            ...mockSongs,
            ...mockSongs,
          ],
        };
      });
      this.get("/songs/:id", (_, request) => {
        const id = request.params.id;
        const song = mockSongs.find((song) => song.id === id);
        if (!song) {
          return new Response(null, { status: 404 });
        }
        return song;
      });
      this.post("/songs", (_, request) => {
        const song = JSON.parse(request.requestBody);
        return mockSongs.push(song);
      });
    },
  });
}
