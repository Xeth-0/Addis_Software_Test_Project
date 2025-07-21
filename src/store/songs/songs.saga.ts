import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  deleteSongRequest,
  updateSongRequest,
  addSongRequest,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
  addSongFailure,
  updateSongFailure,
  deleteSongFailure,
} from "./songs.slice";
import { Song } from "./songs.types";

function fetchSongsApi(limit: number = 0, page: number = 1) {
  console.log("fetching songs from the API (Mirage)");
  return fetch(
    `${process.env.API_BASE_URL}/songs?limit=${limit}&page=${page}`
  ).then((res) => res.json());
}

function addSongApi(song: Song) {
  console.log("adding song to the API (Mirage)");
  return fetch(`${process.env.API_BASE_URL}/songs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  }).then((res) => res.json());
}

function updateSongApi(song: Song) {
  console.log("updating song to the API (Mirage)");
  return fetch(`${process.env.API_BASE_URL}/songs/${song.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  }).then((res) => res.json());
}

function deleteSongApi(id: string) {
  console.log("deleting song from the API (Mirage)");
  return fetch(`${process.env.API_BASE_URL}/songs/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}

function* fetchSongsSaga(
  action: PayloadAction<{ limit: number; page: number }>
) {
  try {
    const data: {
      songs: Song[];
      total: number;
      page: number;
      limit: number;
    } = yield call(fetchSongsApi, action.payload.limit, action.payload.page);

    yield put(fetchSongsSuccess(data));
  } catch (error) {
    yield put(
      fetchSongsFailure(
        error instanceof Error ? error.message : "Failed to fetch songs"
      )
    );
  }
}

function* addSongSaga(action: PayloadAction<Song>) {
  console.log("addSongSaga", action);
  try {
    const data: Song = yield call(addSongApi, action.payload);
    yield put(addSongSuccess(data));
  } catch (error) {
    yield put(
      addSongFailure(
        error instanceof Error ? error.message : "Failed to add song"
      )
    );
  }
}

function* updateSongSaga(action: PayloadAction<Song>) {
  console.log("updateSongSaga", action);
  try {
    const data: Song = yield call(updateSongApi, action.payload);
    yield put(updateSongSuccess(data));
  } catch (error) {
    yield put(
      updateSongFailure(
        error instanceof Error ? error.message : "Failed to update song"
      )
    );
  }
}

function* deleteSongSaga(action: PayloadAction<string>) {
  console.log("deleteSongSaga", action);
  try {
    yield call(deleteSongApi, action.payload);
    yield put(deleteSongSuccess(action.payload));
  } catch (error) {
    yield put(
      deleteSongFailure(
        error instanceof Error ? error.message : "Failed to delete song"
      )
    );
  }
}

export default function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
  yield takeLatest(addSongRequest.type, addSongSaga);
  yield takeLatest(updateSongRequest.type, updateSongSaga);
  yield takeLatest(deleteSongRequest.type, deleteSongSaga);
}
