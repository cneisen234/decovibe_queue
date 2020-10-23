import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

// Saga grabs the history for the student that is logged in at the time
function* fetchStudentHistory(action) {
    try {
        // sends out the get to grab the information
        const response = yield axios.get(`/api/student/history/${action.payload}`)
        // takes the information from get and sends to a reducer
        yield put({ type: "SET_STUDENT_HISTORY", payload: response.data });
    } catch (error) {
        console.log("problem with setting student history", error)
    }
}


function* studentHistorySaga() {
  
  yield takeLatest("FETCH_STUDENT_HISTORY", fetchStudentHistory)
}

export default studentHistorySaga;