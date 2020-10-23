import { combineReducers } from "redux";
// Holds all the information in the charge student table
const deductionList = (state = [], action) => {
    switch (action.type) {
        case 'SET_DEDUCTIONS':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    deductionList,
    
});