import { combineReducers } from "redux";
// Holds the information for the entries for the week
const entryList = (state = [], action) => {
  switch (action.type) {
    case "SET_ENTRY":
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  entryList,
});
