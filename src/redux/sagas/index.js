import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import StudentSaga from './StudentSaga';
import addEntrySaga from './addEntrySaga';
import AdminSaga from './AdminSaga';
import calculationsSaga from './calculationsSaga';
import chargeSaga from './chargeSaga';
import adminHistorySaga from './adminHistorySaga'
import studentHistorySaga from './studentHistorySaga';


// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    StudentSaga(),
    addEntrySaga(),
    AdminSaga(),
    calculationsSaga(),
    chargeSaga(),
    adminHistorySaga(),
    studentHistorySaga()


  ]);
}
