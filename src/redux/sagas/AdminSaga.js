
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteItem(action) {
  try {
    //passes the incoming new admin user info from the payload to the server
    console.log("we are about to delete an item", action.payload);
    yield axios.delete(`/api/admin/deleteitem/${action.payload}`)

    yield put({ type: "GET_ITEM_LIST" });

  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* deleteProgress(action) {
  try {
    //passes the incoming new admin user info from the payload to the server
    console.log("we are about to delete an item", action.payload);
    yield axios.delete(`/api/admin/deleteprogress/${action.payload}`);

    yield put({ type: "GET_PROGRESS_LIST" });
  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* deleteComplete(action) {
  try {
    //passes the incoming new admin user info from the payload to the server
    console.log("we are about to delete an item", action.payload);
    yield axios.delete(`/api/admin/deletecomplete/${action.payload}`);

    yield put({ type: "GET_COMPLETE_LIST" });
  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* addNewItem(action){
     try{

        //passes the incoming new admin user info from the payload to the server
        console.log('we are about to add a new item', action.payload);
        yield axios.post('/api/user/addnewitem', action.payload);

         yield put({ type: "GET_ITEM_LIST"});
      

        console.log('we are about to add a new item', action.payload);
    }catch(error){
        console.log('Error with adding a new item:', error);
    }
  }

  function* addAllProgress(action) {
    try {
      //passes the incoming new admin user info from the payload to the server
      console.log("we are about to add a new item", action.payload);
      yield axios.post("/api/user/addallprogress", action.payload);

      yield put({ type: "GET_PROGRESS_LIST" });

      console.log("we are about to add a new item", action.payload);
    } catch (error) {
      console.log("Error with adding a new item:", error);
    }
  }


  function* markComplete(action) {
    try {
      //passes the incoming new admin user info from the payload to the server
      console.log("we are about to add a new item", action.payload);
      yield axios.post("/api/user/markcomplete", action.payload);

      // yield put({ type: "GET_PROGRESS_LIST" });

      console.log("we are about to add a new item", action.payload);
    } catch (error) {
      console.log("Error with adding a new item:", error);
    }
  }

  function* editQTY(action) {
    try {
      //passes the incoming new admin user info from the payload to the server
      yield axios.put("/api/admin/edititem", action.payload);

      yield put({ type: "GET_ITEM_LIST" });

      console.log("we are about to edit an item", action.payload);
    } catch (error) {
      console.log("Error with editing an item:", error);
    }
  }

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


function* getitemlist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/admin/itemlist`);

    yield put({
      type: "SET_ITEM",
      payload: response.data,
    });

  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getprogresslist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/admin/progresslist`);

    yield put({
      type: "SET_PROGRESS",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getcompletelist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/admin/completelist`);

    yield put({
      type: "SET_COMPLETE",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
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
   yield takeLatest('ADD_NEW_ITEM', addNewItem);
   yield takeLatest('START_ALL_ITEM', addAllProgress);
   yield takeLatest('MARK_COMPLETE', markComplete);
    yield takeLatest('EDIT_ITEM', editQTY);
    yield takeLatest('REGISTER_ADMIN', registerAdmin);
    yield takeLatest('GET_ADMIN', getAdmin);
    yield takeLatest('GET_ITEM_LIST', getitemlist);
    yield takeLatest('GET_PROGRESS_LIST', getprogresslist);
    yield takeLatest('GET_COMPLETE_LIST', getcompletelist);
    yield takeLatest('DELETE_ITEM', deleteItem);
    yield takeLatest('DELETE_PROGRESS', deleteProgress);
    yield takeLatest('DELETE_COMPLETE', deleteComplete);
    yield takeLatest('RESET_ADMIN_PASSWORD', resetAdminPassword);
    yield takeLatest('FORGOT_ADMIN_PASSWORD', forgotAdminPassword);
}

export default AdminSaga;