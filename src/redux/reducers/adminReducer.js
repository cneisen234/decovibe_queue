import { combineReducers } from "redux";
// Holds all the admin accounts
const adminlist = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN':
            return action.payload;
        default:
            return state;
    }
};

const itemlist = (state = [], action) => {
  switch (action.type) {
    case "SET_ITEM":
      return action.payload;
    default:
      return state;
  }
};


export default combineReducers({
    adminlist,
    itemlist,
    
});