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


export default combineReducers({
    adminlist,
    
});