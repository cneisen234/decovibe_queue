import { combineReducers } from "redux";

const itemlist = (state = [], action) => {
  switch (action.type) {
    case "SET_ITEM":
      return action.payload;
    default:
      return state;
  }
};
const progresslist = (state = [], action) => {
  switch (action.type) {
    case "SET_PROGRESS":
      return action.payload;
    default:
      return state;
  }
};
const completelist = (state = [], action) => {
  switch (action.type) {
    case "SET_COMPLETE":
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
    itemlist,
    progresslist,
    completelist,
});