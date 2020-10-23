import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";


//The purpose of this page is to add an admin to the system, only seen by an admin user

class AddAdminForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
    created_at: moment.utc().format(),
  };
  componentDidMount() {}

  //This function handles inputs and stores them in state
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };//End of handleInputChangeFor

  registerAdmin = (event) => {
    event.preventDefault();

    console.log("we are about to send the state", this.state);
    //The if statement below validates the inputs, does not send them if any are empty
    if (
      this.state.first_name &&
      this.state.last_name &&
      this.state.email &&
      this.state.password &&
      this.state.role
    ) {
      //send the new admin to the server through a redux saga
    
      //This is a sweet alerts confirmation, there is a nested redux saga dispatch 
      //If successful, it will route the user to the home page
       Swal.fire({
         title: "Please confirm new admin details below",
         html: `1. First Name: ${this.state.first_name} </br>
          2. Last Name: ${this.state.last_name} </br>
          3. Role: ${this.state.role} </br>
          4. Email: ${this.state.email} </br>`,
         icon: "question",
         showCancelButton: true,
         confirmButtonColor: "#5cb85c",
         cancelButtonColor: "#d33",
         confirmButtonText: "Confirm my entry",
       }).then((result) => {
         console.log("Here is result.value", result.value);
         if (result.value) {
         this.props.dispatch({
           type: "REGISTER_ADMIN",
           payload: {
             first_name: this.state.first_name,
             last_name: this.state.last_name,
             role: this.state.role,
             email: this.state.email,
             password: this.state.password,
             created_at: this.state.created_at,
           },
         });

           Swal.fire("Success!", "Your new admin has been added.", "success");
           this.props.history.push("/home"); //send the user to the homepage
         }
       });
    } else {
      this.props.dispatch({ type: "ADD_ADMIN_ERROR" });
    }
  }; // end registerAdmin

  render() {
 
    return (
      <div>
        <br />
        <center>
          <h1>Add An Admin</h1>
        </center>
        <Paper
          elevation={5}
          style={{ width: "95%", margin: "3% auto", padding: "2%" }}
        >
          <Form className="addstudent">
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  placeholder="First Name"
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.handleInputChangeFor("first_name")}
                />
              </Col>

              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  placeholder="Last Name"
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.handleInputChangeFor("last_name")}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) =>
                    this.setState({ role: event.target.value })
                  }
                >
                  <option value="">Pick From Below</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>Admin Email</Form.Label>
                <Form.Control
                  placeholder="Admin Email"
                  type="email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}
                />
              </Col>
              <Col>
                <Form.Label>Admin Password</Form.Label>
                <Form.Control
                  placeholder="Admin Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                />
              </Col>
            </Row>
            <center>
              <Link to="/home">
                <Button
                  onClick={(event) => this.registerAdmin(event)}
                  variant="success"
                  type="submit"
                  style={{ width: "20%", margin:'1%' }}
                >
                  Create New Admin Account
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
  entries: state.students.studententriesadmin,
  admin: state.admin.adminlist,
});

export default withRouter(connect(mapStateToProps)(AddAdminForm));
