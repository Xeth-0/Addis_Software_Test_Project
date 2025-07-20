import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
} from "./songs.slice";
import { Song } from "./songs.types";

function fetchSongsApi() {
  return fetch("/api/songs").then((res) => res.json());
}

function* fetchSongsSaga() {
  try {
    // yield put(fetchSongsRequest());
    const data: Song[] = yield call(fetchSongsApi);
    yield put(fetchSongsSuccess(data));
  } catch (error) {
    yield put(
      fetchSongsFailure(
        error instanceof Error ? error.message : "Failed to fetch songs"
      )
    );
  }
}

export default function* songsSaga() {
  yield takeLatest(fetchSongsRequest.type, fetchSongsSaga);
}
