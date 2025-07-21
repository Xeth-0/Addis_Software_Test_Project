import { all } from "redux-saga/effects";
import songsSaga from "./songs/songs.saga";

export default function* rootSaga() {
  yield all([songsSaga()]);
}
