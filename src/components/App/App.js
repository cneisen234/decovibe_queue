import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { connect } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import MakeEntry from "../MakeEntry/MakeEntry";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ForgotPasswordAdmin from "../ForgotPassword/ForgotPasswordAdmin";
import PastStudentEntries from "../PastStudentEntries/PastStudentEntries";

import "./App.css";
import PastAdminReports from "../PastAdminReports/PastAdminReports";
import AddStudent from '../AdminHome/AddStudent';
import UpdateStudent from '../AdminHome/UpdateStudent';
import UpdatePassword from "../AdminHome/UpdatePassword";
import StudentEntries from '../AdminHome/StudentEntries';
import AdminUpdateEntry from '../AdminHome/AdminUpdateEntry';
import AddAdmin from '../AdminHome/AddAdmin';
import AdminResetPassword from '../AdminHome/AdminResetPassword';
import StudentResetPassword from '../StudentHome/ResetStudentPassword';
import OpenTransactions from '../OpenTransactions/OpenTransactions';
import ChargeStudent from '../ChargeStudent/ChargeStudent';
import AddAdminForm from '../AdminHome/AddAdminForm';

import PastAdminDeductions from '../PastAdminDeductions/PastAdminDeductions';

import Instructions from '../Instructions/Instructions';
import AdminMakeEntry from "../AdminHome/AdminMakeEntry";




class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}

            <ProtectedRoute exact path="/home" component={UserPage} />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute exact path="/info" component={InfoPage} />
            <ProtectedRoute exact path="/makeentry" component={MakeEntry} />
            <Route //handles token for resetting password via email for student
              exact
              path="/forgotpassword/:token/:email"
              component={ForgotPassword}
            />
            <Route //handles token for resetting password via email for admin
              exact
              path="/forgotpassword/admin/:token/:email"
              component={ForgotPasswordAdmin}
            />
            <ProtectedRoute //page to reset student password (while logged in)
              exact
              path="/resetstudentpassword"
              component={StudentResetPassword}
            />
            <ProtectedRoute //page to view all entries for the pay period (admin side)
              exact
              path="/paststudententries"
              component={PastStudentEntries}
            />
            <ProtectedRoute //page for admins to view all reports that are in the history table
              exact
              path="/pastadminreports"
              component={PastAdminReports}
            />
            {/* Page that admin is brought to when they click the 'add new student' button on admin homepage
            It has the form for the admin to fill out with all the necessary student information */}
            <ProtectedRoute exact path="/addstudent" component={AddStudent} />
            <ProtectedRoute //page admin is brought to when they wish to update a student's information
              exact
              path="/updatestudent/:lcf_id" //lcfid helps prepopulate the page with the exisiting data
              component={UpdateStudent}
            />
            <ProtectedRoute //page admin is brought to when they wish to update a student's password
              exact
              path="/updatepassword/:lcf_id"
              component={UpdatePassword}
            />
            <ProtectedRoute //shows all entries made by the students to the admin
              exact
              path="/totalstudententries"
              component={StudentEntries}
            />
            <ProtectedRoute //shows all entries made by the students to the admin
              exact
              path="/adminmakeentry"
              component={AdminMakeEntry}
            />
            <ProtectedRoute //page admin is brought to when they wish to update a student's specific entry
              exact
              path="/adminentryupdate/:lcf_id" //lcf if helps prepopulate the page with existing data
              component={AdminUpdateEntry}
            />
            {/*List of all admins registered within the app */}
            <ProtectedRoute exact path="/adminusers" component={AddAdmin} />
            {/*Form for admin to fill out if they wish to add a new admin to the organization*/}
            <ProtectedRoute
              exact
              path="/addadminform"
              component={AddAdminForm}
            />
            <ProtectedRoute //page that allows admin to reset their password (while logged in)
              exact
              path="/resetadminpassword"
              component={AdminResetPassword}
            />
            <ProtectedRoute //page for admin to review payroll calculations BEFORE pushing to history table
              exact //used for making sure bad data is not immeditaely pushed to the history table
              path="/opentransactions"
              component={OpenTransactions} //i.e. pulls from 'open_transaction' in the database
            />
            <ProtectedRoute //page that shows admin a list of all the deductions made to students
              exact
              path="/deductionlist"
              component={PastAdminDeductions}
            />
            <ProtectedRoute //page for admin to fill out if they wish to charge a student
              exact //this links into their account and is part of the payroll calculations
              path="/chargestudent"
              component={ChargeStudent}
            />
            <ProtectedRoute //page that explains how to use the application (admin side)
              exact
              path="/instructions"
              component={Instructions}
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(App);
