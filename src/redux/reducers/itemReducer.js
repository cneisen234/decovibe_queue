import { combineReducers } from "redux";

const itemlist = (state = [], action) => {
  switch (action.type) {
    case "SET_ITEM":
      return action.payload;
    default:
      return state;
  }
};
const itemlistcount = (state = [], action) => {
  switch (action.type) {
    case "SET_ITEM_COUNT":
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

const progresslistcount = (state = [], action) => {
  switch (action.type) {
    case "SET_PROGRESS_COUNT":
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

const completelistcount = (state = [], action) => {
  switch (action.type) {
    case "SET_COMPLETE_COUNT":
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
  itemlist,
  itemlistcount,
  progresslist,
  progresslistcount,
  completelist,
  completelistcount,
});