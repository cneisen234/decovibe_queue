import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
// Saga runs the calculations in the background and takes all the new information and puts it into a reducer
function* fetchCalculations() {
  try {
    // calls the calc function that is a stored proc function inside of the database
    yield axios.get("/api/admin/calc");
    // grabs all the information now inside of the open transaction table
    const response = yield axios.get("/api/admin/pending")
    // takes the information just grabbed and places it inside of a reducer
    yield put({ type: "SET_CALCULATIONS", payload: response.data });
    // sets redirect as true and redirects you to the next page after you run the calculations
    yield put({ type: "SET_REDIRECT", payload: true});
    // resets the redirect so you can go back to that page if you want
    yield put({ type: "SET_REDIRECT", payload: false});
  } catch (error) {
    console.log("error fetch ", error);
  }
}


function* addEntrySaga() {
  yield takeLatest("FETCH_CALCULATIONS", fetchCalculations);
}

export default addEntrySaga;