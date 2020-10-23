
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// worker saga: will be fired on REGISTER_STUDENT actions
//this action registers a new student, the information is entered
//by the organizational admin, when he/she is logged into their account

function* registerStudent(action) {
    try{
        //clear any errors on the page before
        yield put ({ type: 'CLEAR_ADD_STUDENT_ERROR' });

        //passes the incoming new student user info from the payload to the server
        console.log('we are about to register a new student', action.payload);
        yield axios.post('/api/user/addstudent', action.payload);

         yield put({ type: "GET_STUDENTS"});
      

        //console.log('we are about to send data for a new student', action.payload);
    }catch(error){
        console.log('Error with student registration:', error);
        yield put ({ type: 'STUDENT_REGISTRATION_FAILED' });
    }
}

function* checktrip(action) {
  try {

    //passes the incoming new student user info from the payload to the server
    yield axios.put("/api/user/checktrip", action.payload);

    yield put({ type: "GET_STUDENTS" });


  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* checkpaid(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    yield axios.put("/api/user/checkpaid");

    yield put({ type: "GET_STUDENTS" });
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* deactivateStudent(action) {
  try {
    //clear any errors on the page before
    yield put({ type: "CLEAR_ADD_STUDENT_ERROR" });

    //passes the incoming new student user info from the payload to the server
    yield axios.put("/api/student/deactivate", action.payload);
    //console.log(action.payload)

    yield put({ type: "GET_STUDENTS" });

    console.log("we are about to send data for a new student", action.payload);
  } catch (error) {
    console.log("Error with student registration:", error);
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* activateStudent(action) {
  try {
    //clear any errors on the page before
    yield put({ type: "CLEAR_ADD_STUDENT_ERROR" });

    //passes the incoming new student user info from the payload to the server
    yield axios.put("/api/student/activate", action.payload);
    console.log(action.payload);

    yield put({ type: "GET_STUDENTS" });

    //console.log("we are about to send data for a new student", action.payload);
  } catch (error) {
    console.log("Error with student registration:", error);
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}


function* updateStudent(action) {
    try {
        //clear any errors on the page before
        yield put({
            type: 'CLEAR_UPDATE_STUDENT_ERROR'
        });
            //console.log('we are about to send data for a student update', action.payload);
        //passes the incoming updated student user info from the payload to the server

        yield axios.put(`/api/student/updatestudent/${action.payload.lcf_id}`, action.payload);
         yield put({ type: "GET_STUDENTS"});

       
    } catch (error) {
        console.log('Error with student update:', error);
        yield put({
            type: 'STUDENT_UPDATE_FAILED'
        });
    }
}

function* updatePassword(action) {
  try {
    //clear any errors on the page before
    yield put({
      type: "CLEAR_UPDATE_STUDENT_ERROR",
    });
    console.log(
      "we are about to send data for a student update",
      action.payload
    );
    //passes the incoming updated student user info from the payload to the server

    yield axios.put(
      `/api/student/updatepassword/${action.payload.lcf_id}`,
      action.payload
    );
    yield put({ type: "GET_STUDENTS" });
  } catch (error) {
    console.log("Error with student update:", error);
    yield put({
      type: "STUDENT_UPDATE_FAILED",
    });
  }
}






function* deleteStudent(action) {
    try {
        //clear any errors on the page before
        yield put({
            type: 'CLEAR_DELETE_STUDENT_ERROR'
        });

        //sends the id for the student to be deleted to the server
        yield axios.delete(`/api/student/${action.payload.id}`);

        console.log('we are about to delete the student with this id:', action.payload.id);

        yield put({ type: 'GET_STUDENTS', payload: action.payload })

    } catch (error) {
        console.log('Error with student deletion:', error);
        yield put({
            type: 'STUDENT_DELETION_FAILED'
        });
    }
}

function* getStudents(action) {
        try {
            //console.log('we are about to get Students', action.type);

            const response = yield axios.get(`/api/student/studentlist`);

            yield put({
                type: 'SET_STUDENTS',
                payload: response.data
            });


            //console.log('Here is the list of student', response.data);
        } catch (error) {
            console.log('Error with getting the list of Students:', error);
        }
}


function * getStudentEntriesForAdmin (action){
    try{
        console.log('We are about to get all entries for student');
        const response = yield axios.get(`/api/student/studententries`);

        yield put ({
            type: 'SET_STUDENT_ENTRIES_ADMIN_VIEW',
            payload: response.data
        });
    //console.log('Here is the list of entries', response.data);
    }
    catch (error) {
        console.log('Error with getting the list of Student entries:', error);
    }
}


function* adminentryupdate(action){
    console.log('We are updating a student entry', action.payload);
    try {
        const response = yield axios.put(`/api/student/updateentry/${action.payload.lcf_id}`, action.payload);
       
        yield put({type: 'SET_STUDENT_ENTRIES_ADMIN_VIEW', payload: response.data});

        console.log("Success in updating student entry.");
    } catch (error) {
        console.log("error editing student entry", error);
    }
}

function* adminentry(action) {
  console.log("We are creating a student entry", action.payload);
  try {
    const response = yield axios.post(
      `/api/student/adminmakeentry`,
      action.payload
    );

    yield put({
      type: "SET_STUDENT_ENTRIES_ADMIN_VIEW",
      payload: response.data,
    });

    console.log("Success in updating student entry.");
  } catch (error) {
    console.log("error editing student entry", error);
  }
}



function* resetStudentPassword(action) {
    try{
            //clear any errors on the page before
            yield put({ type: 'CLEAR_RESET_STUDENT_PASSWORD_ERROR' });

             //passes the incoming new student password info from the payload to the server
             console.log('we are about to reset the student password', action.payload);
             const response = yield axios.put(`/api/user/studentpasswordreset/${action.payload.lcf_id}`, action.payload);
             
             yield put({ type: "SET_USER", payload: response.data });
            console.log("Success in updating new password or email.");

    }catch(error){
          console.log("error editing password or email", error);
    }
}

function* forgotStudentPassword(action) {
  try {
    //clear any errors on the page before
    yield put({ type: "CLEAR_RESET_STUDENT_PASSWORD_ERROR" });

    //passes the incoming new student password info from the payload to the server
    console.log("we are about to reset the student password", action.payload);
    const response = yield axios.put(
      `/api/user/passwordforgot/`,
      action.payload
    );

    yield put({ type: "SET_USER", payload: response.data });
    console.log("Success in updating new password or email.");
  } catch (error) {
    console.log("error editing password or email", error);
  }
}

function* getStudentForEdit(action){
  try {
    console.log('Wait what is action here?', action)
      const response = yield axios.get(`/api/student/student/${action.payload}`);
console.log('inside get of student', response.data);
      yield put({
          type: 'EDIT_STUDENT',
          payload: response.data
      });   
  } catch (error) {
      console.log('Error with getting the list of Students:', error);
  }
}



function* StudentSaga() {
    yield takeLatest('REGISTER_STUDENT', registerStudent);
    yield takeLatest('CHECK_TRIP', checktrip);
     yield takeLatest('CHECK_PAID', checkpaid);
     yield takeLatest('UPDATE_STUDENT', updateStudent);
     yield takeLatest('UPDATE_PASSWORD', updatePassword);
     yield takeLatest('FORGOT_STUDENT_PASSWORD', forgotStudentPassword);
     yield takeLatest('DELETE_STUDENT', deleteStudent);
     yield takeLatest('GET_STUDENTS', getStudents);
     yield takeLatest('FETCH_ENTRIES_FOR_ADMIN', getStudentEntriesForAdmin);
     yield takeLatest("ADMIN_ENTRY_UPDATE", adminentryupdate);
     yield takeLatest("ADMIN_ENTRY", adminentry);
     yield takeLatest('RESET_STUDENT_PASSWORD', resetStudentPassword);
     yield takeLatest('DEACTIVATE_STUDENT', deactivateStudent);
     yield takeLatest('ACTIVATE_STUDENT', activateStudent);
     //yield takeLatest('EDIT_STUDENT', editStudent)
     yield takeLatest('GET_STUDENT_FOR_EDIT', getStudentForEdit)
     
}

export default StudentSaga;






