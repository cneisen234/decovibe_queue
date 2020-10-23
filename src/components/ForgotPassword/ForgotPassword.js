import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

//this is the page where students get routed to from their email link when they
//forget their password
class ForgotPassword extends Component {
  state = {
    email: "",
    password: "",
    retype_password: "",
    token: "",
  };

  componentDidMount() {
    // grabs the token from the header, this comes in from the token generated
    // from the database when the forgot password email is sent
    // this is used for verification purposes
    let token = window.location.hash;
    token = token.slice(17, 49);
    // grabs the email address of the user from the header, 
    // this comes in from the email that the user enters when they forget their password
    // this is used for verification purposes
      let email = window.location.hash;
      email = email.slice(50);
    //sets the state with the information above to get it ready to send to 
    //the server
    this.setState({
      token: token,
      email: email,
    });
  }
  //function to send information from user to the server to reset their password
  resetStudentPassword = (event) => {
    //prevents any default actions
    event.preventDefault();
    //validates of the information in state is populated
    if (
      this.state.token &&
      this.state.password &&
      this.state.retype_password &&
      this.state.password === this.state.retype_password
    ) {
      //send the new password to the server through a redux saga
      this.props.dispatch({
        type: "FORGOT_STUDENT_PASSWORD",
        payload: {
          token: this.state.token,
          email: this.state.email,
          password: this.state.password,
        },
      });
      //sends user back to the homescreen after resetting password
      this.props.history.push("/home");
    } else {
      //error if password reset fails
      this.props.dispatch({ type: "RESET_STUDENT_PASSWORD_ERROR" });
    }
  }; // end resetStudentPassword

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="navbuttonscontainer">
          {/* Takes the student back to the homepage */}
          <Link to="/home">
            <Button variant="outline-primary">Home</Button>
          </Link>{" "}
        </div>
        <Card
          border="info"
          style={{ width: "95%", margin: "3% auto", padding: "2%" }}
        >
          <h1 style={{ width: "50%", margin: "5% 35%" }}>
            Reset Student Password
          </h1>
          {/* begin form for resetting student password */}
          <Form className="addstudent">
            <Row>
              {/* enter password */}
              <Col>
                <Form.Label>New Student Password</Form.Label>
                <Form.Control
                  placeholder="New Student Password"
                  type="text"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                />
              </Col>
              {/* type password in again to verify */}
              <Col>
                <Form.Label>Re-type New Student Password</Form.Label>
                <Form.Control
                  placeholder="Re-type New Student Password"
                  type="text"
                  name="password"
                  value={this.state.retype_password}
                  onChange={this.handleInputChangeFor("retype_password")}
                />
              </Col>
            </Row>
            {/* button that runs reset password link */}
            <Link to="/home">
              <Button
                onClick={(event) => this.resetStudentPassword(event)}
                variant="success"
                type="submit"
                style={{ width: "40%", margin: "7% 30% 2%" }}
              >
                Submit Student Info
              </Button>
            </Link>
          </Form>
        </Card>
      </div>
    ); //end return
  } //end render
} //end ForgotPassword

const mapStateToProps = (state) => ({
  //redux state for user information
  user: state.user,
});

export default connect(mapStateToProps)(ForgotPassword);
