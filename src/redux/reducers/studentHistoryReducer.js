import { combineReducers } from "redux";
// Stores the history for the single student
const studentHistoryReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_STUDENT_HISTORY":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default combineReducers({
    studentHistoryReducer,
  });