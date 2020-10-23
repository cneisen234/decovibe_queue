import React, {Component} from 'react';
import { connect } from 'react-redux';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from 'react-bootstrap/Row'
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';
import moment from "moment";
import Swal from "sweetalert2";



   // This component is for updating student information

class UpdateStudent extends Component {
  

  
  state = {
    
    first_name: "",
    last_name:"",
    grade:"",
    grad_year: "",
    school_attend:  "", 
    lcf_id:"",
    lcf_start_date:"",
    student_email:"",
    password: "",
    pif_amount: "",
    isLoaded: false
    
  };

  filterStudentArray = (students) => {
    return students.filter(
      (entry) =>
        entry.first_name &&
        entry.last_name &&
        entry.grade &&
        entry.grad_year &&
        entry.school_attend &&
        entry.lcf_id &&
        moment.utc(entry.lcf_start_date).format() &&
        entry.student_email &&
        entry.password &&
        entry.pif_amount
    );
  };

  componentDidMount() {

    if (!this.state.isLoaded){
    let url_array=document.location.href.split("/");
    
let id = url_array[url_array.length-1];


    this.props.dispatch({
      type: "GET_STUDENTS",
    });

    this.props.dispatch({
      type: "GET_STUDENT_FOR_EDIT", payload: id
    });

   

    this.props.dispatch({
      type: "FETCH_ENTRIES_FOR_ADMIN",
    });

    this.props.students.map((item, index) => {
      if(item.lcf_id === Number(id)){
        console.log('HELLO',item)
        this.setState({
          first_name: item.first_name,
          last_name: item.last_name,
          grade: item.grade,
          grad_year: item.grad_year,
          school_attend: item.school_attend,
          lcf_id: item.lcf_id,
          lcf_start_date: moment.utc(item.lcf_start_date).format("YYYY-MM-DD"),
          student_email: item.student_email,
          password: "",
          pif_amount: item.pif_amount,
        });
       } else {
          console.log('FAIL', item.lcf_id)
          console.log(id)
        }
      
    })
  }
  this.setState({isLoaded: true})
  }

  
  //Start of update student

  updateStudent = (event) => {
    event.preventDefault();
    console.log("we are about to send the state", this.state);

//Form validation to check if all the fields have been filled in
    if (
      this.state.first_name &&
      this.state.last_name &&
      this.state.grade &&
      this.state.grad_year &&
      this.state.school_attend &&
      this.state.lcf_id &&
      this.state.student_email &&
      this.state.pif_amount
    ) {
       Swal.fire({
         title: "Please confirm details below",
         html: `1. First Name: ${this.state.first_name} </br>
      2. Last Name: ${this.state.last_name} </br>
      3. Student Grade: ${this.state.grade} </br>
      4. LCF Start Date: ${this.state.lcf_start_date} </br>
      5. Student Year: ${this.state.grad_year} </br>
      6. School ${this.state.school_attend} </br>
      7. ID Number ${this.state.lcf_id} </br>
      8. Email Address: ${this.state.student_email} </br>
      9. PIF Amount: ${this.state.pif_amount} </br>`,
         icon: "question",
         showCancelButton: true,
         confirmButtonColor: "#5cb85c",
         cancelButtonColor: "#d33",
         confirmButtonText: "Confirm my entry",
       }).then((result) => {
         if (result.value) {
           //send the updated student to the server through a redux saga
           this.props.dispatch({
             type: "UPDATE_STUDENT",
             payload: {
               first_name: this.state.first_name,
               last_name: this.state.last_name,
               grade: this.state.grade,
               grad_year: this.state.grad_year,
               school_attend: this.state.school_attend,
               lcf_id: this.state.lcf_id,
               lcf_start_date: this.state.lcf_start_date,
               student_email: this.state.student_email,
               password: this.state.password,
               pif_amount: this.state.pif_amount,
               
             },
           });
           Swal.fire("Success!", "Your entry has been logged.", "success");
           this.props.history.push("/home");
         }
       });
    } else {
      this.props.dispatch({ type: "UPDATE_STUDENT_ERROR" });
    }
  }; // end updateStudent

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    console.log('state is', this.state)
    //console.log('this should be it', this.props.location.state.lcf_id);
    console.log('this is now props.editStudent', this.props.editStudent)

    return (
      <div>
        <h1 style={{ width: "50%", margin: "2% 35%" }}>
          Update Student Information
          
          
        </h1>

        <Card border = "info" style={{ width: '90%', margin: '3% auto', padding: '2%' }} >
        <Form className="addstudent">
          {" "}
          {/* <== does this className need to change? */}
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
                value={this.state.grade}
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
                type="text"
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
                type="text"
                name="pif_amount"
                value={this.state.pif_amount}
                onChange={this.handleInputChangeFor("pif_amount")}
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
            {/* <Col>
              <Form.Label>Student Password</Form.Label>
              <Form.Control
                placeholder="Student Password"
                type="text"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
              />
            </Col> */}
          </Row>
          <Button
            onClick={(event) => this.updateStudent(event)}
            variant="success"
            type="submit"
            style={{ width: "40%", margin: "7% 30% 2%" }}
          >
            Update Student Info
          </Button>
        </Form>
        </Card>
      </div>
    );
  }
}



const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
  editStudent: state.editStudent // Stores the information for a single student
});
   
export default connect(mapStateToProps) (UpdateStudent);