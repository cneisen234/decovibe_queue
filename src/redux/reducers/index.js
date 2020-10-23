import { combineReducers } from 'redux';
import errors from './errorsReducer';
import loginMode from './loginModeReducer';
import user from './userReducer';
import students from './studentReducer';
import entry from './entryReducer'
import admin from './adminReducer';
import editStudent from './editStudentReducer';
import calculations from './calculationsReducer';
import history from './historyReducer';
import studentHistory from './studentHistoryReducer';
import redirect from './redirectReducer';
import deductionList from './adminDeductionRouter';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  loginMode, // will have a value of 'login' or 'registration' to control which screen is shown
  user, // will have an id and username if someone is logged in
  students, //combined reducer for all things student related
  entry, //combined reducer for all things entry related
  admin, //will combine reducer for all things admin related
  editStudent,
  calculations,
  history,
  studentHistory,
  redirect,
  deductionList
});

export default rootReducer;
