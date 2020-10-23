import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";

//The component below is f
class AdminResetPassword extends Component {
  state = {
    admin_id: this.props.user.admin_id,
    //email: this.props.user.email,
    password: "",
    retype_password: "",
    password_empty_error: '',
    retype_password_empty_error: '',
    password_nomatch_error: '',
    retype_password_nomatch_error: ''
  };

  //This function dispatched our newly added admin to the database from state
  //We first validate the inputs to make sure we are not sending empty inputs to the server
  resetAdminPassword = (event) => {
    event.preventDefault();

    console.log(
      "we are about to send the state to change admin password",
      this.state
    );
    console.log("this is the user", this.props.user);

    if (
      this.state.admin_id &&
      
      this.state.password &&
      this.state.retype_password &&
      this.state.password === this.state.retype_password
    ) {
      //send the new student to the server through a redux saga
      this.props.dispatch({
        type: "RESET_ADMIN_PASSWORD",
        payload: {
          admin_id: this.state.admin_id,
          //email: this.state.email,
          password: this.state.password,
        },
      });
         Swal.fire({
           icon: "Success",
           title: "Activation",
           text: `Admin number ${this.state.admin_id} password has been reset`,
         });

         this.props.history.push("/home");

      this.setState({
        admin_id: this.props.user.admin_id,
        //email: this.props.user.email,
        password: "",
        retype_password: "",
      });
    }  else if (this.state.password === '') {
      this.setState({ password_empty_error: true });

      setTimeout(() => {
        this.setState({ password_empty_error: false, }); }, 5000);
    }else if (this.state.retpye_password === '') {
      this.setState({ retype_password_empty_error: true });

      setTimeout(() => {
        this.setState({ retype_password_empty_error: false, }); }, 5000);
    }else if (this.state.retpye_password !== this.state.password){
      this.setState({ retype_password_nomatch_error: true, password_nomatch_error: true });

      setTimeout(() => {
        this.setState({ retype_password_nomatch_error: false, password_nomatch_error: false}); }, 5000);
    }
  }; // end registerAdmin

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <br />
        <center>
          <h1>Reset Admin Password</h1>
        </center>

          {(this.state.password_empty_error === true || this.state.retype_password_empty_error === true) && (
          <Alert className="error" style={{}} severity="error">
            Please enter a new password to reset your old password.
          </Alert>
        )}
    
        {(this.state.password_nomatch_error === true || this.state.retype_password_nomatch_error === true) && (
          <Alert className="error" style={{}} severity="error">
            Your new password entry does not match. Please re-enter
          </Alert>
        )}
        

        <Paper
          elevation={5}
          style={{ width: "70%", margin: "3% auto", padding: "2%" }}
        >
          <Form className="addstudent">
            <Row> 
              {/* <Col>
                <Form.Label>Admin Email</Form.Label>
                <Form.Control
                  placeholder="Admin Email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}
                />
              </Col> */}
              <Col>
              <center>
                <Form.Label>New Admin Password</Form.Label>
                <Form.Control
                  placeholder="New Admin Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                  style={{width:'60%'}}
                /></center>
              </Col>
              
              <Col>
              <center>
                <Form.Label>Re-type New Password</Form.Label>
                <Form.Control
                  placeholder="Re-type New Admin Password"
                  type="password"
                  name="password"
                  value={this.state.retype_password}
                  onChange={this.handleInputChangeFor("retype_password")}
                  style={{width:'60%'}}
                /></center>
              </Col>
              
            </Row>
            <center>
              <Link to="/home">
                <Button
                  onClick={(event) => this.resetAdminPassword(event)}
                  variant="success"
                  type="submit"
                  style={{ width: "20%", margin: "1%" }}
                >
                  Reset Admin Password
                </Button>
              </Link>
            </center>
          </Form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AdminResetPassword);
