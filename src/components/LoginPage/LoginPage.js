import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import "./LoginPage.css";

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
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
  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }; //end handleInputChangeFor
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
                  </div>
                  {/* runs login error toast */}
                  {this.props.errors.loginMessage && (
                    <Alert className="loginError" style={{}} severity="error">
                      {this.props.errors.loginMessage}
                    </Alert>
                  )}
                </form>
              </>
    
          </center>
          <center></center>
        </Grid>
        <Grid item xs={12} sm={12} md={7} style={{ display: "block" }}>
          {/* logo on login page */}
          <img
            style={{ height: 600 }}
            id="shapes"
            src="data:image/jpeg;base64,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"
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
