
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* deleteItem(action) {
  try {
    console.log("we are about to delete an item", action.payload);
    yield axios.delete(`/api/item/deleteitem/${action.payload}`)

    yield put({ type: "GET_ITEM_LIST" });

  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* deleteCustomItem(action) {
  try {
    console.log("we are about to delete an item", action.payload);
    yield axios.delete(`/api/item/deletecustomitem/${action.payload}`);

    yield put({ type: "GET_CUSTOM_ITEM_LIST" });
  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* deleteRespond(action) {
  try {
    console.log("we are about to delete an item", action.payload);
    yield axios.delete(`/api/item/deleterespond/${action.payload}`);

    yield put({ type: "GET_RESPOND_LIST" });
  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* deleteProgress(action) {
  try {
    console.log("we are about to delete an item", action.payload);
    yield axios.delete(`/api/item/deleteprogress/${action.payload}`);

    yield put({ type: "GET_PROGRESS_LIST" });
  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* deleteHistory(action) {
  try {
    console.log("we are about to delete an item", action.payload);
    yield axios.delete(`/api/item/deletehistory/${action.payload}`);

    yield put({ type: "GET_HISTORY_LIST" });
  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* deleteComplete(action) {
  try {
    console.log("we are about to delete an item", action.payload);
    yield axios.delete(`/api/item/deletecomplete/${action.payload}`);

    yield put({ type: "GET_COMPLETE_LIST" });
  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* deleteCompleteAll(action) {
  try {
    console.log("we are about to delete everything", action.payload);
    yield axios.delete(`/api/item/deletecompleteall`);

    yield put({ type: "GET_COMPLETE_LIST" });
  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* deleteCompleteRange(action) {
  try {
    console.log("we are about to delete everything from 2 weeks ago", action.payload);
    yield axios.delete(`/api/user/deletecompleterange`);

    yield put({ type: "GET_COMPLETE_LIST" });
    yield put({ type: "GET_ITEM_LIST_COUNT" });
    yield put({ type: "GET_PROGRESS_LIST_COUNT" });
    yield put({ type: "GET_COMPLETE_LIST_COUNT" });
  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* deleteHistoryRange(action) {
  try {
    console.log(
      "we are about to delete everything from 2 weeks ago",
      action.payload
    );
    yield axios.delete(`/api/user/deletehistoryrange`);

    yield put({ type: "GET_COMPLETE_LIST" });
    yield put({ type: "GET_ITEM_LIST_COUNT" });
    yield put({ type: "GET_PROGRESS_LIST_COUNT" });
    yield put({ type: "GET_COMPLETE_LIST_COUNT" });
  } catch (error) {
    console.log("Error with adding a new item:", error);
  }
}

function* addNewItem(action){
     try{
        console.log('we are about to add a new item', action.payload);
        yield axios.post('/api/user/addnewitem', action.payload);

         yield put({ type: "GET_ITEM_LIST"});
      

        console.log('we are about to add a new item', action.payload);
    }catch(error){
        console.log('Error with adding a new item:', error);
    }
  }

  function* startTask(action) {
    try {
      console.log("we are about to add a new item", action.payload);
      yield axios.post("/api/user/starttask", action.payload);

      yield put({ type: "GET_PROGRESS_LIST" });

      console.log("we are about to add a new item", action.payload);
    } catch (error) {
      console.log("Error with adding a new item:", error);
    }
  }

    function* customerResponse(action) {
      try {
        console.log("we are about to add a new item", action.payload);
        yield axios.post("/api/user/customerresponse", action.payload);

        // yield put({ type: "GET_RESPONSE_LIST" });
        console.log("we are about to add a new item", action.payload);
      } catch (error) {
        console.log("Error with adding a new item:", error);
      }
    }

   function* customerConfirm(action) {
     try {
       console.log("we are about to add a new item", action.payload);
       yield axios.post("/api/user/customerconfirm", action.payload);

       yield put({ type: "GET_CUSTOMER_LIST" });

       console.log("we are about to add a new item", action.payload);
     } catch (error) {
       console.log("Error with adding a new item:", error);
     }
   }
   

  


  function* markComplete(action) {
    try {
      console.log("we are about to add a new item", action.payload);
      yield axios.post("/api/user/markcomplete", action.payload);

      yield put({ type: "GET_COMPLETE_LIST" });

      console.log("we are about to add a new item", action.payload);
    } catch (error) {
      console.log("Error with adding a new item:", error);
    }
  }

  function* assignTask(action) {
    try {
      console.log("this payload is", action.payload)
      yield axios.put("/api/item/assign", action.payload);

      yield put({ type: "GET_ITEM_LIST" });

      console.log("we are about to edit an item", action.payload);
    } catch (error) {
      console.log("Error with editing an item:", error);
    }
  }

  function* assignCustomTask(action) {
    try {
      console.log("this payload is", action.payload);
      yield axios.put("/api/item/customassign", action.payload);

      yield put({ type: "GET_CUSTOM_ITEM_LIST" });

      console.log("we are about to edit an item", action.payload);
    } catch (error) {
      console.log("Error with editing an item:", error);
    }
  }

function* register(action){
     try{
        //clear any errors on the page before
        yield put ({ type: 'CLEAR_ADD_ERROR' });
        console.log('we are about to register a new user', action.payload);
        yield axios.post('/api/user/adduser', action.payload);

         yield put({ type: "GET_USER"});
      

        console.log('we are about to send data for a new user', action.payload);
    }catch(error){
        console.log('Error with registration:', error);
        yield put ({ type: 'REGISTRATION_FAILED' });
    }
}

function* forgotPassword(action) {
  try {

    //passes the incoming new student password info from the payload to the server
    console.log("we are about to reset the password", action.payload);
    const response = yield axios.put(
      `/api/user/passwordforgot/item`,
      action.payload
    );

    yield put({ type: "SET_USER", payload: response.data });
    console.log("Success in updating new password or email.");
  } catch (error) {
    console.log("error editing password or email", error);
  }
}


function* getUser (action){
    try {
            //console.log('we are about to get Students', action.type);

            const response = yield axios.get(`/api/item/userlist`);

            yield put({
                type: 'SET_USER',
                payload: response.data
            });

        } catch (error) {
            console.log('Error with getting the list of users:', error);
        }

}


function* getitemlist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/item/itemlist`);

    yield put({
      type: "SET_ITEM",
      payload: response.data,
    });

  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* gethistorylist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/item/historylist`);

    yield put({
      type: "SET_HISTORY",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* checkHistory(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    console.log("this is the payload", action.payload);
    const response = yield axios.post("api/item/checkhistory", action.payload);
    console.log("this is response.data in sagas", response.data);
    yield put({
      type: "SET_HISTORY_TABLE",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}


function* getcustomitemlist(action) {
  try {

    const response = yield axios.get(`/api/item/customitemlist`);
    console.log(response.data)

    yield put({
      type: "SET_CUSTOM_ITEM",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getitemlistcount(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/item/itemlistcount`);

    yield put({
      type: "SET_ITEM_COUNT",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getcustomitemlistcount(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/item/customitemlistcount`);

    yield put({
      type: "SET_CUSTOM_ITEM_COUNT",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getprogresslist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/item/progresslist`);

    yield put({
      type: "SET_PROGRESS",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getprogresslistcount(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/item/progresslistcount`);

    yield put({
      type: "SET_PROGRESS_COUNT",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getconfirmlist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/item/confirmlist`);

    yield put({
      type: "SET_CONFIRM",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}



function* getconfirmlistcount(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/item/confirmlistcount`);

    yield put({
      type: "SET_CONFIRM_COUNT",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getrespondlist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/item/respondlist`);

    yield put({
      type: "SET_RESPOND",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getrespondlistcount(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/item/respondlistcount`);

    yield put({
      type: "SET_RESPOND_COUNT",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getcompletelist(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/item/completelist`);

    yield put({
      type: "SET_COMPLETE",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}

function* getcompletelistcount(action) {
  try {
    //console.log('we are about to get Students', action.type);

    const response = yield axios.get(`/api/item/completelistcount`);

    yield put({
      type: "SET_COMPLETE_COUNT",
      payload: response.data,
    });
  } catch (error) {
    console.log("Error with getting the list of items:", error);
  }
}
function* orderDetails(action) {
  try {
    //passes the incoming new student user info from the payload to the server
    console.log("this is the payload", action.payload);
    const response = yield axios.post("/api/item/orderdetails", action.payload);
    console.log("this is response.data in sagas", response.data);
    yield put({
      type: "SET_DETAILS",
      payload: response.data,
    });
  } catch (error) {
    yield put({ type: "STUDENT_REGISTRATION_FAILED" });
  }
}

function* resetPassword(action){
    try{
            //clear any errors on the page before
            yield put({ type: 'CLEAR_RESET_PASSWORD_ERROR' });
             console.log('we are about to reset the password', action.payload);
             const response = yield axios.put(`/api/user/passwordreset/${action.payload.user_id}`, action.payload);
             
             yield put({ type: "SET_USER", payload: response.data });
            console.log("Success in updating new password.");

    }catch(error){
          console.log("error editing username", error);
    }
}




function* itemSaga() {
   yield takeLatest('ADD_NEW_ITEM', addNewItem);
    yield takeLatest('CHECK_HISTORY', checkHistory);
   yield takeLatest('START_ITEM', startTask);
     yield takeLatest('CUSTOMER_CONFIRM', customerConfirm);
     yield takeLatest('CUSTOMER_RESPONSE', customerResponse);
   yield takeLatest('MARK_COMPLETE', markComplete);
    yield takeLatest('ASSIGN_TASK', assignTask);
    yield takeLatest('ASSIGN_CUSTOM_TASK', assignCustomTask);
    yield takeLatest('REGISTER', register);
    yield takeLatest('GET_USER', getUser);
    yield takeLatest('GET_ITEM_LIST', getitemlist);
       yield takeLatest('GET_HISTORY_LIST', gethistorylist);
     yield takeLatest('GET_CUSTOM_ITEM_LIST', getcustomitemlist);
    yield takeLatest('GET_ITEM_LIST_COUNT', getitemlistcount);
     yield takeLatest('GET_CUSTOM_ITEM_LIST_COUNT', getcustomitemlistcount);
    yield takeLatest('GET_PROGRESS_LIST', getprogresslist);
    yield takeLatest('GET_PROGRESS_LIST_COUNT', getprogresslistcount);
    yield takeLatest('GET_CONFIRM_LIST', getconfirmlist);
    yield takeLatest('GET_CONFIRM_LIST_COUNT', getconfirmlistcount);
    yield takeLatest('GET_RESPOND_LIST', getrespondlist);
    yield takeLatest('GET_RESPOND_LIST_COUNT', getrespondlistcount);
    yield takeLatest('GET_COMPLETE_LIST', getcompletelist);
    yield takeLatest('GET_COMPLETE_LIST_COUNT', getcompletelistcount);
    yield takeLatest('DELETE_ITEM', deleteItem);
    yield takeLatest('DELETE_CUSTOM_ITEM', deleteCustomItem);
     yield takeLatest('DELETE_RESPOND', deleteRespond);
    yield takeLatest('DELETE_PROGRESS', deleteProgress);
     yield takeLatest('DELETE_HISTORY', deleteHistory);
    yield takeLatest('DELETE_COMPLETE', deleteComplete);
     yield takeLatest('DELETE_COMPLETE_ALL', deleteCompleteAll);
     yield takeLatest('DELETE_COMPLETE_RANGE', deleteCompleteRange);
     yield takeLatest('DELETE_HISTORY_RANGE', deleteHistoryRange);
     yield takeLatest('ORDER_DETAILS', orderDetails);
    yield takeLatest('RESET_PASSWORD', resetPassword);
    yield takeLatest('FORGOT_PASSWORD', forgotPassword);
}

export default itemSaga;