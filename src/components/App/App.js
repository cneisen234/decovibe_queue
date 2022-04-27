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
            <Redirect exact from="/" to="/home" />

            <Route exact path="/vS1pfTQrIAm5Gi771xdHIDmbrsez0Yzbj17bYhBvcKwUAYisUaLk3liJlMieIZ3qFJTPLSZxBpyzakbE6SWNA6xWgAUun5Gj2kqF/:token" component={CustomerPage} />
            <Route exact path="/vS1pfTQrIAm5Gi771xdHIDmbrsez0Yzbj17bYhBvcKwUAYisUaLk3liJlMieIZ3qFJTPLSZxBpyzakbE6SWNA6xWgAUun5Gj2kNo/:token" component={CustomerDeny} />
            
            <ProtectedRoute exact path="/orderlookup" component={OrderLookup} />
            <ProtectedRoute exact path="/orderlookuptest" component={OrderLookupTest} />
            <ProtectedRoute exact path="/home" component={New} />
            <ProtectedRoute exact path="/newcustom" component={NewCustom} />
            <ProtectedRoute exact path="/Progress" component={Progress} />
            <ProtectedRoute exact path="/SentCustomer" component={SentCustomer} />
            <ProtectedRoute exact path="/Response" component={Response} />
            <ProtectedRoute exact path="/Approved" component={Approved} />
            <ProtectedRoute exact path="/History" component={History} />
            <ProtectedRoute exact path="/Complete" component={Complete} />
            <ProtectedRoute exact path="/Customcomplete" component={CustomComplete} />

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

export default connect(mapStateToProps)(App);
