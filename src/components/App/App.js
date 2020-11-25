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


import New from "../Home/New";
import InfoPage from "../InfoPage/InfoPage";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

import "./App.css";
import UpdatePassword from "../Home/UpdatePassword";
import Progress from '../Home/Progress';
import Complete from "../Home/Complete";
import AddUser from '../Home/AddUser';
import ResetPassword from '../Home/ResetPassword';
import Instructions from '../Instructions/Instructions';




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

            <ProtectedRoute exact path="/home" component={New} />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute exact path="/info" component={InfoPage} />
            <Route
              exact
              path="/forgotpassword/:token/:email"
              component={ForgotPassword}
            />
            <ProtectedRoute
              exact
              path="/Progress"
              component={Progress}
            />
            <ProtectedRoute
              exact
              path="/Complete"
              component={Complete}
            />
            <ProtectedRoute 
              exact
              path="/updatepassword/:lcf_id"
              component={UpdatePassword}
            />
            <ProtectedRoute exact path="/users" component={AddUser} />
            <ProtectedRoute
              exact
              path="/resetpassword"
              component={ResetPassword}
            />
            <ProtectedRoute
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
