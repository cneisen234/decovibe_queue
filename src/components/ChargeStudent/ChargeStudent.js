import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import moment from "moment";
import { Alert } from "@material-ui/lab";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Paper from "@material-ui/core/Paper";

import Swal from "sweetalert2";

//This page is used to give the admin the ability to charge the student via a form
//i.e. note a debt that needs to be paid and is subtracted from their next paycheck
class ChargeStudent extends Component {
  state = {
    lcf_id: null,
    type: null,
    description: null,
    amount: null,
    lcf_id_error: false,
    no_lcf_id_error: false,
  };

  //need to get a list of all students so admin can choose which one is being charged
  componentDidMount() {
    this.props.dispatch({
      type: "GET_STUDENTS",
    });
  }

  chargeStudent = (event) => {
    event.preventDefault();
    if (this.state.lcf_id) {
      //send the updated student to the server through a redux saga

      let allStudents = this.props.students;
      //   console.log("this.props.student", this.props.students)

      for (let student of allStudents) {
        console.log("student ID", student.lcf_id);
        if (Number(this.state.lcf_id) === Number(student.lcf_id)) { //need to check that student actually exists
          this.props.dispatch({
            type: "CHARGE_STUDENT",
            payload: {
              lcf_id: this.state.lcf_id,
              admin_id: this.props.user.admin_id, //grabs the id of the admin currently logged in
              date: moment(), //upon successful submission, use current date
              type: this.state.type,
              description: this.state.description,
              amount: this.state.amount,
            },
          });
          Swal.fire({
            icon: "Success",
            title: "Activation",
            text: `Student number ${this.state.lcf_id} has been charged`,
          });

          this.props.history.push("/home");
          return;
        }
      }

      this.setState({
        lcf_id_error: true,
      });

      setTimeout(() => {
        this.setState({
          lcf_id_error: false,
        });
      }, 5000);
    } else {
      this.setState({
        no_lcf_id_error: true,
      });

      setTimeout(() => {
        this.setState({
          no_lcf_id_error: false,
        });
      }, 5000);
    }
  }; // end updateStudent

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
        {this.state.lcf_id_error === true && ( //alerts the admin if the lcf_id of the student does not exist
          <Alert className="error" style={{}} severity="error">
            The LCF ID you entered does not exist in the system, try again!
          </Alert>
        )}
        <br />
        {/*NOTE: typing the lcf id was later changed to simply choosing a name off the drop down list */}
        {this.state.no_lcf_id_error === true && ( //checks to make sure that an lcf_id was entered
          <Alert className="error" style={{}} severity="error">
            You have not entered an LCF ID for the student!
          </Alert>
        )}
        
        <center>
        <h1>
          Create New Deduction to Student Account
        </h1></center>

        <Paper
          elevation={5}
          style={{ width: "90%", margin: "3% auto", padding: "2%" }}
        >
          <Form>
            <Row>
              <Col>
            <Form.Label>Student Name</Form.Label>
            <Form.Control
              as="select"
              onChange={(event) => this.setState({ lcf_id: event.target.value })}>
              <option value="">Pick From Below </option> {/*As opposed to the admin inputting an lcf id 
              was changed to selecting a name from a drop dpwn menu of all students currently in the student database table*/}

              {this.props.students ? this.props.students.map((student) => (
                    <option key={student.lcf_id} value={student.lcf_id}>
                      {" "}
                      {student.first_name}&nbsp; {student.last_name}&nbsp;
                    {" "}
                    </option>
                  ))
                : ""}
            </Form.Control>
          </Col>
              <Col>
                <Form.Label>Charge Type</Form.Label> 
                {/*What kind of charge is it?  */}
                <Form.Control
                  placeholder="Type"
                  type="text"
                  name="type"
                  value={this.state.type}
                  onChange={this.handleInputChangeFor("type")}
                />
              </Col>
            </Row>
            
            <Row>
              <Col>
                <Form.Label>Description</Form.Label>
                {/*Admin gives a short description of the charge or reason for the charge  */}
                <Form.Control
                  placeholder="Description"
                  type="text"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleInputChangeFor("description")}
                />
              </Col>
              <Col>
                <Form.Label>Charge Amount</Form.Label>
                {/*Dollar amount of charge. How much does the student owe from this?  */}
                <Form.Control
                  placeholder="Amount"
                  type="number"
                  name="amount"
                  value={this.state.amount}
                  onChange={this.handleInputChangeFor("amount")}
                />
              </Col>
            </Row>
            <center>
            <Button //upon pressing, runs chargeStudent function which, if everything looks good
            //will send off the entered data to be placed inside the 'charge_student' table in the database
              onClick={(event) => this.chargeStudent(event)}
              variant="success"
              type="submit"
              style={{ width: "20%", margin:'1%'}}
            >
              Create New Charge
            </Button>
            </center>
          </Form>
        </Paper>
        <br/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
  entries: state.students.studententriesadmin,
});

export default connect(mapStateToProps)(ChargeStudent);
