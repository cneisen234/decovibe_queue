import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";
import { withRouter } from "react-router";
import { Paper } from "@material-ui/core";

//This form is for adding a student to the application

class AddStudent extends Component {
  state = {
    first_name: "",
    last_name: "",
    grade: "",
    grad_year: "",
    school_attend: "",
    lcf_id: "",
    lcf_start_date: "",
    student_email: "",
    password: "",
    savings: 0,
    pif_amount: "",
    email_error: false, //used for toast error handling if email exists
    lcfID_error: false, //used for toast error handling if LCF ID exists
    error: false,
    created_at: moment.utc().format(),
  };

  componentDidMount() {
    this.props.dispatch({
      type: "GET_STUDENTS",
    });
  }

  //This function dispatched our newly added student to the database from state
  //We first validate the inputs to make sure we are not sending empty inputs to the server
  registerStudent = (event) => {
    console.log("Are we in here");
    event.preventDefault();

    //The if statement below is used to validate inputs and make sure we are not dispatching empty 
    //inputs to the server
    if (
      this.state.first_name &&
      this.state.last_name &&
      this.state.grade &&
      this.state.grad_year &&
      this.state.school_attend &&
      this.state.lcf_id &&
      this.state.lcf_start_date &&
      this.state.student_email &&
      this.state.password &&
      this.state.pif_amount
    ) {
      
      //The for loop checks to see if the email being added for the new student has been used
      //for another student who has already been added to the system
      let allStudents = this.props.students;
      for (let student of allStudents) {
        if (student.student_email === this.state.student_email) {
          this.setState({
            email_error: true,
          });

          setTimeout(() => {
            this.setState({
              email_error: false,
            });
          }, 5000);
          return;
        }

//The if statement below checks to see if the id being added has been already been added to the system in the past
        if (Number(student.lcf_id) === Number(this.state.lcf_id)) {
          this.setState({
            lcfID_error: true,
          });

          setTimeout(() => {
            this.setState({
              lcfID_error: false,
            });
          }, 5000);
          return;
        }
      }

      const {
        first_name,
        last_name,
        grade,
        grad_year,
        school_attend,
        lcf_id,
        lcf_start_date,
        student_email,
        password,
        pif_amount,
        savings,
      } = this.state;


//This is a sweet alert confirmation, with a nested dispatch to register a student. 
//The dispatch is fired if the sweet alert is confirmed
      Swal.fire({
        title: "Please confirm new student details below",
        html: `1. First Name: ${first_name} </br>
          2. Last Name: ${last_name} </br>
          3. Grade: ${grade} </br>
          4. Graduation Year: ${grad_year} </br>
          5. School Name: ${school_attend} </br>
          6. LCF ID: ${lcf_id} </br>
          7. LCF Start Date: ${lcf_start_date} </br>
          8. Student Email: ${student_email} </br>
          9. Password: ${password}</br>
          10. PIF Amount ${pif_amount}</br>
          11. Previous Savings: ${savings}`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#5cb85c",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm my entry",
      }).then((result) => {
        console.log("Here is result.value", result.value);
        if (result.value) {
          this.props.dispatch({
            type: "REGISTER_STUDENT",
            payload: {
              first_name: first_name,
              last_name: last_name,
              grade: grade,
              grad_year: grad_year,
              school_attend: school_attend,
              lcf_id: lcf_id,
              lcf_start_date: lcf_start_date,
              student_email: student_email,
              password: password,
              pif_amount: pif_amount,
              savings: savings,
            },
          });

          Swal.fire("Success!", "Your new student has been added.", "success");
          this.props.history.push("/home");
        }
      });
    } else {
      this.setState({
        error: true,
      });

      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, 5000);
      this.props.dispatch({ type: "ADD_STUDENT_ERROR" });
    }
  }; // end registerStudent

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
        {this.state.email_error === true && (
          <Alert className="error" style={{}} severity="error">
            The email you entered already exists in the system, pick a new one!
          </Alert>
        )}
        <br />
        {this.state.lcfID_error === true && (
          <Alert className="error" style={{}} severity="error">
            The LCF ID you chose already exists in the system, pick a new one!
          </Alert>
        )}
        {this.state.error === true && (
          <Alert className="error" style={{}} severity="error">
            Please fill out all of the required fields
          </Alert>
        )}

        <center>
          <h1>Add A Student</h1>
        </center>

        <Paper
          elevation={5}
          style={{ width: "90%", margin: "3% auto", padding: "2%" }}
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
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) =>
                    this.setState({ grade: event.target.value })
                  }
                >
                  <option value="">Pick From Below</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>Graduation Year</Form.Label>
                <Form.Control
                  placeholder="Enter Graduation Year"
                  type="number"
                  name="grad_year}"
                  min={new Date().getFullYear()}
                  value={this.state.grad_year}
                  onChange={this.handleInputChangeFor("grad_year")}
                />
              </Col>
              <Col>
                <Form.Label>School Name</Form.Label>
                <Form.Control
                  placeholder="School Name"
                  type="text"
                  name="school_attend"
                  value={this.state.school_attend}
                  onChange={this.handleInputChangeFor("school_attend")}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>LCF ID:</Form.Label>
                <Form.Control
                  placeholder="Enter LCF ID"
                  type="number"
                  name="lcf_id"
                  value={this.state.lcf_id}
                  onChange={this.handleInputChangeFor("lcf_id")}
                />
              </Col>
              <Col>
                <Form.Label>LCF Start Date</Form.Label>
                <Form.Control
                  placeholder="LCF Start Date"
                  type="date"
                  name="lcf_start_date"
                  value={this.state.lcf_start_date}
                  onChange={this.handleInputChangeFor("lcf_start_date")}
                />
              </Col>
              <Col>
                <Form.Label>PIF Contribution</Form.Label>
                <Form.Control
                  placeholder="PIF Contribution"
                  type="number"
                  name="pif_amount"
                  value={this.state.pif_amount}
                  onChange={this.handleInputChangeFor("pif_amount")}
                />
              </Col>
              <Col>
                <Form.Label>Previous Savings</Form.Label>
                <Form.Control
                  placeholder="Previous Savings"
                  type="number"
                  name="savings"
                  value={this.state.savings}
                  onChange={this.handleInputChangeFor("savings")}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Student Email</Form.Label>
                <Form.Control
                  placeholder="Student Email"
                  type="email"
                  name="student_email"
                  value={this.state.student_email}
                  onChange={this.handleInputChangeFor("student_email")}
                />
              </Col>
              <Col>
                <Form.Label>Student Password</Form.Label>
                <Form.Control
                  placeholder="Student Password"
                  type="text"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor("password")}
                />
              </Col>
            </Row>

            <center>
              <Button
                onClick={(event) => this.registerStudent(event)}
                variant="success"
                type="submit"
                style={{ width: "20%", marginTop: "2%" }}
              >
                Create New Student
              </Button>
            </center>
          </Form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist, //brings in list of students from global state
});

export default withRouter(connect(mapStateToProps)(AddStudent));
