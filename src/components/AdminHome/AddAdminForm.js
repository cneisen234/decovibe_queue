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
    placeholder_1: "",
    placeholder_2: "",
    placeholder_3: "",
    placeholder_4: "",
    placeholder_5: "",
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
      this.state.placeholder_1 &&
      this.state.placeholder_2 &&
      this.state.placeholder_3 &&
      this.state.placeholder_4 &&
      this.state.placeholder_5
    ) {
      //send the new admin to the server through a redux saga
    
      //This is a sweet alerts confirmation, there is a nested redux saga dispatch 
      //If successful, it will route the user to the home page
       
         this.props.dispatch({
           type: "REGISTER_ADMIN",
           payload: {
             first_name: this.state.placeholder_1,
             last_name: this.state.placeholder_2,
             role: this.state.placeholder_3,
             email: this.state.placeholder_4,
             password: this.state.placeholder_5,
             created_at: this.state.created_at,
           },
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
          <h1>Add A New Item</h1>
        </center>
        <Paper
          elevation={5}
          style={{ width: "95%", margin: "3% auto", padding: "2%" }}
        >
          <Form className="addstudent">
            <Row>
              <Col>
                <Form.Label>Placeholder 1</Form.Label>
                <Form.Control
                  placeholder="Placeholder 1"
                  type="text"
                  name="Placeholder 1"
                  value={this.state.placeholder_1}
                  onChange={this.handleInputChangeFor("placeholder_1")}
                />
              </Col>

              <Col>
                <Form.Label>Placeholder 2</Form.Label>
                <Form.Control
                  placeholder="Placeholder 2"
                  type="text"
                  name="Placeholder 2"
                  value={this.state.placeholder_2}
                  onChange={this.handleInputChangeFor("placeholder_2")}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label>Placeholder 3</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) =>
                    this.setState({ placeholder_3: event.target.value })
                  }
                >
                  <option value="">Pick From Below</option>
                  <option value="admin">Option 1</option>
                  <option value="admin">Option 2</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>Placeholder 4</Form.Label>
                <Form.Control
                  placeholder="Placeholder 4"
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInputChangeFor("email")}
                />
              </Col>
              <Col>
                <Form.Label>Placeholder 5</Form.Label>
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
                  style={{ width: "20%", margin: "1%" }}
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
