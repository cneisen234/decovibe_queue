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
import NewCustom from "../Home/NewCustom";
import "./App.css";
import Progress from '../Home/Progress';
import SentCustomer from "../Home/SentCustomer";
import CustomerPage from "../Home/CustomerPage";
import CustomerDeny from "../Home/CustomerDeny";
import OrderLookup from "../Home/OrderLookup";
import OrderLookupTest from "../Home/OrderLookupTest";
import Response from "../Home/Response";
import Approved from "../Home/Approved";
import History from "../Home/History";
import Complete from "../Home/Complete";
import CustomComplete from "../Home/CustomComplete";
class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: "FETCH_USER" });
  }

  render() {
    return (
      <Router>
        <div>
          <div id="Nav">
            <Nav />
          </div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            <Route //customer path to confirm order, not in protected route, but verified by admin generated token followed by unique customer token
              exact
              path="/vS1pfTQrIAm5Gi771xdHIDmbrsez0Yzbj17bYhBvcKwUAYisUaLk3liJlMieIZ3qFJTPLSZxBpyzakbE6SWNA6xWgAUun5Gj2kqF/:token"
              component={CustomerPage}
            />
            <Route //customer path to confirm order, not in protected route, but verified by admin generated token followed by unique customer token
              exact
              path="/vS1pfTQrIAm5Gi771xdHIDmbrsez0Yzbj17bYhBvcKwUAYisUaLk3liJlMieIZ3qFJTPLSZxBpyzakbE6SWNA6xWgAUun5Gj2kNo/:token"
              component={CustomerDeny}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute exact path="/orderlookup" component={OrderLookup} />
            <ProtectedRoute
              exact
              path="/orderlookuptest"
              component={OrderLookupTest}
            />
            <ProtectedRoute exact path="/home" component={New} />
            <ProtectedRoute exact path="/newcustom" component={NewCustom} />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute exact path="/Progress" component={Progress} />
            <ProtectedRoute
              exact
              path="/SentCustomer"
              component={SentCustomer}
            />
            <ProtectedRoute exact path="/Response" component={Response} />
            <ProtectedRoute exact path="/Approved" component={Approved} />
            <ProtectedRoute exact path="/History" component={History} />
            <ProtectedRoute exact path="/Complete" component={Complete} />
            <ProtectedRoute exact path="/Customcomplete" component={CustomComplete} />

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
