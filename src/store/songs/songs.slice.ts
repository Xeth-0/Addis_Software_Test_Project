import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "./songs.types";

interface SongState {
  list: Song[];
  favorites: Song[];
  playing: Song | null;
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  limit: number;
}

const initialState: SongState = {
  list: [],
  favorites: [],
  playing: null,
  loading: true,
  error: null,
  total: 0,
  page: 1,
  limit: 0,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    // READ
    fetchSongsRequest(
      state,
      action: PayloadAction<{ limit?: number; page?: number }>
    ) {
      state.loading = true;
      state.error = null;
      state.limit = action.payload.limit || 0;
      state.page = action.payload.page || 1;
      state.total = 0;
    },
    fetchSongsSuccess(
      state,
      action: PayloadAction<{
        songs: Song[];
        total: number;
        page: number;
        limit: number;
      }>
    ) {
      state.list = action.payload.songs;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // CREATE
    addSongRequest(state, action: PayloadAction<Song>) {
      state.loading = true;
      state.error = null;
    },
    addSongSuccess(state, action: PayloadAction<Song>) {
      state.list = [action.payload, ...state.list];
      state.loading = false;
    },
    addSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // UPDATE
    updateSongRequest(state, action: PayloadAction<Song>) {
      state.loading = true;
      state.error = null;
    },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      const index = state.list.findIndex(
        (song) => song.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
      state.loading = false;
    },
    updateSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // DELETE
    deleteSongRequest(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess(state, action: PayloadAction<string>) {
      state.list = state.list.filter((song) => song.id !== action.payload);
      state.loading = false;
    },
    deleteSongFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    // FAVORITES
    addFavorite(state, action: PayloadAction<Song>) {
      console.log("addFavorite", action.payload);
      state.favorites.push(action.payload);
    },
    removeFavorite(state, action: PayloadAction<Song>) {
      console.log("removeFavorite", action.payload);
      state.favorites = state.favorites.filter(
        (song) => song.id !== action.payload.id
      );
    },

    // PLAYING
    setPlaying(state, action: PayloadAction<Song | null>) {
      state.playing = action.payload;
    },
    clearPlaying(state) {
      state.playing = null;
    },
  },
});

export const {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,

  addSongRequest,
  addSongSuccess,
  addSongFailure,

  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,

  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,

  addFavorite,
  removeFavorite,

  setPlaying,
  clearPlaying,
} = songsSlice.actions;

export default songsSlice.reducer;
