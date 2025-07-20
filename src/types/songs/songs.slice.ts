import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Song } from "./songs.types";

interface SongState {
  list: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: SongState = {
  list: [],
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess(state, action: PayloadAction<Song[]>) {
      state.list = action.payload;
      state.loading = false;
    },
    fetchSongsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchSongsRequest, fetchSongsSuccess, fetchSongsFailure } =
  songsSlice.actions;

export default songsSlice.reducer;
