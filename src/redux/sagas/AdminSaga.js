
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* registerAdmin(action){
     try{
        //clear any errors on the page before
        yield put ({ type: 'CLEAR_ADD_ADMIN_ERROR' });

        //passes the incoming new admin user info from the payload to the server
        console.log('we are about to register a new admin', action.payload);
        yield axios.post('/api/user/addadmin', action.payload);

         yield put({ type: "GET_ADMIN"});
      

        console.log('we are about to send data for a new admin', action.payload);
    }catch(error){
        console.log('Error with admin registration:', error);
        yield put ({ type: 'ADMIN_REGISTRATION_FAILED' });
    }
}

function* forgotAdminPassword(action) {
  try {
    //clear any errors on the page before
    yield put({ type: "CLEAR_RESET_STUDENT_PASSWORD_ERROR" });

    //passes the incoming new student password info from the payload to the server
    console.log("we are about to reset the admin password", action.payload);
    const response = yield axios.put(
      `/api/user/passwordforgot/admin`,
      action.payload
    );

    yield put({ type: "SET_USER", payload: response.data });
    console.log("Success in updating new password or email.");
  } catch (error) {
    console.log("error editing password or email", error);
  }
}


function* getAdmin (action){
    try {
            //console.log('we are about to get Students', action.type);

            const response = yield axios.get(`/api/admin/adminlist`);

            yield put({
                type: 'SET_ADMIN',
                payload: response.data
            });

            //console.log('Here is the list of admins', response.data);
        } catch (error) {
            console.log('Error with getting the list of Admins:', error);
        }

}


function* resetAdminPassword(action){
    try{
            //clear any errors on the page before
            yield put({ type: 'CLEAR_RESET_ADMIN_PASSWORD_ERROR' });

             //passes the incoming new admin user info from the payload to the server
             console.log('we are about to reset the admin password', action.payload);
             const response = yield axios.put(`/api/user/adminpasswordreset/${action.payload.admin_id}`, action.payload);
             
             yield put({ type: "SET_USER", payload: response.data });
            console.log("Success in updating new password.");

    }catch(error){
          console.log("error editing username", error);
    }
}




function* AdminSaga() {
    yield takeLatest('REGISTER_ADMIN', registerAdmin);
    yield takeLatest('GET_ADMIN', getAdmin);
    yield takeLatest('RESET_ADMIN_PASSWORD', resetAdminPassword);
    yield takeLatest('FORGOT_ADMIN_PASSWORD', forgotAdminPassword);
}

export default AdminSaga;