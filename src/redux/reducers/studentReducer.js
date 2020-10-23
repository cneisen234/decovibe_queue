import { combineReducers } from "redux";
// Stores the information from the students table in the database
const studentlist = (state = [], action) => {
    switch (action.type) {
        case "SET_STUDENTS":
            return action.payload;
        default:
            return state;
    }
};

const studententriesadmin = (state = [], action) => {
    switch (action.type) {
        case 'SET_STUDENT_ENTRIES_ADMIN_VIEW':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
   studentlist,
   studententriesadmin,
});