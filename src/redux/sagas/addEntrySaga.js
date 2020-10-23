import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
// Grabs all the information out of the entry table
function* fetchEntry() {
  try {
    // sends a get to grab the data
    const response = yield axios.get("/entry");
    // takes the information and stores it inside of a reducer
    yield put({ type: "SET_ENTRY", payload: response.data });
  } catch (error) {
    console.log("error fetch ", error);
  }
}
// Used to set a new entry
function* addEntry(action) {
  console.log('inside addEntry saga',action.payload);
  try {
    // sends off the post request to a entry 
    yield axios.post(`/entry`, action.payload);
  } catch (error) {
    console.log("Error adding entry:", error);
  }
}

function* addEntrySaga() {
  yield takeLatest("ADD_ENTRY", addEntry);
  yield takeLatest("FETCH_ENTRY", fetchEntry);
}

export default addEntrySaga;