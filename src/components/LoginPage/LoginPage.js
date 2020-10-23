import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";
import "./LoginPage.css";

//login page for both student and admin, this is the first page a user should
//see when they enter the application
class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    //toggle values used for conditional rendering, default is false
    toggle: false,
    toggle2: false,
    //error value used to conditionally render error toasts, default is false
    error: false,
  };

  //function ran when user logs in
  login = (event) => {
    //prevents any default actions
    event.preventDefault();
    //validates username and password on login, this info is also validated
    //on the server
    if (this.state.username && this.state.password) {
      //redux sagas for login
      this.props.dispatch({
        type: "LOGIN",
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      //error message if login failed or info is not validated
      this.props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
    //this makes it so whenever a user logs in, they go straight to homepage
    this.props.history.push("/home");
  }; // end login

  //function ran when student forgets their password
  handleReset = (event) => {
    //prevents any default actions
    event.preventDefault();
    //change error in state to true if input is empty, this conditionally renders
    //a toast
    if (this.state.username === "") {
      this.setState({
        error: true,
      });
      //sets back to false after 5 seconds, causing error toast to disappear
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, 5000);
      return;
    }
    //dispatches redux sagas for forgot student password
    this.props.dispatch({
      type: "FORGOT_PASSWORD",
      payload: {
        username: this.state.username,
      },
    });
    //start sweet alerts
    Swal.fire({
      icon: "info",
      title: "Password Reset",
      text: `Password Reset email sent, please check your email.`,
    }); //end sweet alerts
  }; //end handleReset

  //function ran when admin forgets their password
  handleResetAdmin = (event) => {
    //prevents any default actions
    event.preventDefault();
    //change error in state to true if input is empty, this conditionally renders
    //a toast
    if (this.state.username === "") {
      this.setState({
        error: true,
      });
      //sets back to false after 5 seconds, causing error toast to disappear
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, 5000);
      return;
    }
    //dispatches redux sagas for forgot admin password
    this.props.dispatch({
      type: "FORGOT_PASSWORD_ADMIN",
      payload: {
        username: this.state.username,
      },
    });
    //start sweet alerts
    Swal.fire({
      icon: "info",
      title: "Password Reset",
      text: `Password Reset email sent, please check your email.`,
    }); //end sweet alerts
  }; //end handleResetAdmin

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; //end handleInputChangeFor

  //function that changes toggle to true, used to conditionally render
  toggle = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  }; //end toggle

  //function that changes toggle2 to true, used to conditionally render
  toggle2 = () => {
    this.setState({
      toggle2: !this.state.toggle2,
    });
  }; //end toggle2

  render() {
    return (
      <Grid container style={{}}>
        <Grid item xs={12} sm={12} md={5} style={{ display: "block" }}>
          <center>
            {/* if error in state is true, render this alert, shows up as a toast
            and conditionally renders based on value in state */}
            {this.state.error === true && (
              <Alert className="error" style={{}} severity="error">
                Please provide your email address
              </Alert>
            )}
            {/* line breaks for spacing */}
            <br />
            <br />
            {/* if toggle in state is false, render login form */}
            {this.state.toggle === false ? (
              <>
                {/* start login form */}
                <form onSubmit={this.login} className="reglogin">
                  <h1>Login</h1>
                  <br />
                  <div>
                    {/* enter email address here */}
                    <label htmlFor="username">
                      Email: &nbsp; &nbsp; &nbsp;{" "}
                      {/*Creates a blank space, used for lining things up */}
                      <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handleInputChangeFor("username")}
                      />
                    </label>
                  </div>
                  {/* enter password here */}
                  <div>
                    <label htmlFor="password">
                      Password: &nbsp;
                      <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChangeFor("password")}
                      />
                    </label>
                  </div>
                  <div>
                    {/* runs the login function on submit */}
                    <input
                      className="log-in"
                      type="submit"
                      name="submit"
                      value="Log In"
                    />
                    {/* changes toggle to true, rendering forgot password form */}
                    <button onClick={this.toggle} className="log-in">
                      Forgot Password
                    </button>
                  </div>
                  {/* runs login error toast */}
                  {this.props.errors.loginMessage && (
                    <Alert className="loginError" style={{}} severity="error">
                      {this.props.errors.loginMessage}
                    </Alert>
                  )}
                </form>
              </>
            ) : (
              // if toggle is true, render forgot password form
              <div>
                {/* if toggle2 is false, render student forgot password form */}
                {this.state.toggle2 === false ? (
                  <div className="reglogin">
                    {/* begin forgot password form */}
                    <form onSubmit={this.handleReset}>
                      <h1>Student Reset Password</h1>
                      <br />
                      <div>
                        {/* enter email address here */}
                        <label htmlFor="username">
                          Email: &nbsp; &nbsp; &nbsp;{" "}
                          {/*Creates a blank space, used for lining things up */}
                          <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChangeFor("username")}
                          />
                        </label>
                      </div>
                      {/* runs handleReset on submit */}
                      <div>
                        <input
                          className="log-in"
                          type="submit"
                          name="submit"
                          value="Reset"
                        />
                      </div>
                      {/* renders toast on input error */}
                      {this.props.errors.loginMessage && (
                        <Alert
                          className="loginError"
                          style={{}}
                          severity="error"
                        >
                          {this.props.errors.loginMessage}
                        </Alert>
                      )}
                    </form>
                    {/* switches toggle back to false, rendering login form */}
                    <button onClick={this.toggle} className="log-in">
                      Back To Login
                    </button>
                    {/* switches toggle2 to true, rendering forgot password for admin */}
                    <button onClick={this.toggle2} className="log-in">
                      Switch to Admin
                    </button>
                  </div>
                ) : (
                  // if toggle2 in state is true, render form for admin
                  <div className="reglogin">
                    {/* start form for forgot password on the admin side */}
                    <form onSubmit={this.handleResetAdmin}>
                      <h1>Admin Reset Password</h1>
                      <br />
                      <div>
                        {/* enter email address here */}
                        <label htmlFor="username">
                          Email: &nbsp; &nbsp; &nbsp;{" "}
                          {/*Creates a blank space, used for lining things up */}
                          <input
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleInputChangeFor("username")}
                          />
                        </label>
                      </div>
                      <div>
                        {/* runs handleResetAdmin on submit */}
                        <input
                          className="log-in"
                          type="submit"
                          name="submit"
                          value="Reset"
                        />
                      </div>
                      {/* renders toast on input error */}
                      {this.props.errors.loginMessage && (
                        <Alert
                          className="loginError"
                          style={{}}
                          severity="error"
                        >
                          {this.props.errors.loginMessage}
                        </Alert>
                      )}
                    </form>
                    {/* switches toggle back to false, rendering login form */}
                    <button onClick={this.toggle} className="log-in">
                      Back To Login
                    </button>
                    {/* switches toggle2 to false, rendering forgot password for student */}
                    <button onClick={this.toggle2} className="log-in">
                      Switch to Student
                    </button>
                  </div>
                )}
              </div>
            )}
          </center>
          <center>
          </center>
        </Grid>
        {/* shape images that appear on login page as decoration */}
        <Grid item xs={12} sm={12} md={7} style={{ display: "block" }}>
          <img
            id="shapes"
            src="https://legacychildrensfoundation.com/wp-content/uploads/2020/03/shapes-bg-color.png"
            alt="Colored Shapes"
          />
        </Grid>
      </Grid>
    ); //end return
  } //end render
} //end LoginPage

// Instead of taking everything from state, we just want the error messages.
const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
