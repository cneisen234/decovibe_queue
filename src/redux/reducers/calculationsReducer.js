import { combineReducers } from "redux";
// Stores all the entries in the open transaction table after the calaculation have been ran
const calculations = (state = [], action) => {
  switch (action.type) {
    case "SET_CALCULATIONS":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  calculations,
});