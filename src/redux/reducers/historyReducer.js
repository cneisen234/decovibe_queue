import { combineReducers } from "redux";
// Stores the information inside the history table.
const history = (state = [], action) => {
    switch (action.type) {
      case "SET_HISTORY":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default combineReducers({
    history,
  });