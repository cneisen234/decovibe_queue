import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";
// Saga for creating a new deduction for a student
function* chargeStudent(action) {
  
  try {
    // sends out a post to /charge to update the students total debt to new amount after deduction.
    yield axios.post(`/charge`, action.payload);
  } catch (error) {
    console.log("Error posting charge:", error);
  }
}
// Saga for grabbing all the deductions from the charge student table in the database.
function* fetchDeductions(action) {
  try {
    // get to grab all the information from database.
    const response = yield axios.get('/api/admin/chargehistory');
    // sets all the information just grabbed and puts it in a reducer
    yield put({type: "SET_DEDUCTIONS", payload: response.data})
  } catch (error){
    console.log("error with deduction saga", error)
  }
}


function* chargeSaga() {
  yield takeLatest("CHARGE_STUDENT", chargeStudent);
  yield takeLatest("FETCH_DEDUCTIONS", fetchDeductions);
}

export default chargeSaga;