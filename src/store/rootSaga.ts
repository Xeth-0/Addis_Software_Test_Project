import { all } from "redux-saga/effects";
import songsSaga from "../types/songs/songs.saga";

export default function* rootSaga() {
  yield all([songsSaga()]);
}
