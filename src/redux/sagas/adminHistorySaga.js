import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchConfirm() {
  //runs Confirm() funtion in SQL
  try {
    //once this runs, can then get new entries from the History table
    yield axios.get("/api/admin/confirm");
    const response = yield axios.get("/api/admin/history"); //get entries from History table
    console.log("response in fetchConfirm is", response);
    yield put({ type: "SET_HISTORY", payload: response.data });
    yield put({ type: "SET_ENTRY", payload: [] });
    yield put({ type: "SET_CALCULATIONS", payload: [] });
    yield put({ type: "SET_REDIRECT_HOME", payload: true });
    yield put({ type: "SET_REDIRECT_HOME", payload: false });
  } catch (error) {
    //display error
    console.log("error fetch ", error);
  }
}

function* fetchHistory() {
  //allows GET on History entries
  try {
    const response = yield axios.get("/api/admin/history"); //get entries from History table
    console.log("send info to history reducer", response);
    yield put({ type: "SET_HISTORY", payload: response.data });
  } catch (error) {
    //dispaly error
    console.log("problem with setting history", error);
  }
}

function* adminHistorySaga() {
  yield takeLatest("FETCH_CONFIRM", fetchConfirm);
  yield takeLatest("FETCH_HISTORY", fetchHistory);
}

export default adminHistorySaga;

