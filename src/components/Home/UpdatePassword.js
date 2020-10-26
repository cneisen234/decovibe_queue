import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import Paper from "@material-ui/core/Paper";
import { Alert } from "@material-ui/lab";



class UpdatePassword extends Component {
  state = {
    password: "",
    retypePassword:"",
    retypeError:false,
    emptyError:false,
   
  };

  componentDidMount() {
    this.props.dispatch({
      type: "GET_USERS",
    });

    this.props.dispatch({
      type: "FETCH_ENTRIES_FOR_USER",
    });

    


  

  }

  //beginning of update password
  updatePassword = (event) => {
    event.preventDefault();

    let url_array=document.location.href.split("/"); //Captures the url
    
let id = url_array[url_array.length-1]; //takes id off the end of the url
    console.log("we are about to send the state",id, this.state);

    //Form validation for avoiding empty inputs for a new password reset
    if (this.state.password === null || this.state.password === "" || this.state.retypePassword === null || this.state.retypePassword === ""){
      this.setState({
        emptyError: true
      })
      return;
    }//Form validation for password and retype password not being the same
    else if (this.state.password !== this.state.retypePassword){
      this.setState({
        retypeError: true
      })
      return;
    }

    if (this.state.password) {
      this.props.dispatch({
        type: "UPDATE_PASSWORD",
        payload: {
          password: this.state.password,
          lcf_id: id,
        },
      });
         Swal.fire({
           icon: "Success",
           title: "Activation",
           text: `User number ${id} password has been reset`,
         });
      
      this.props.history.push("/home");
    } else {
      this.props.dispatch({ type: "UPDATE_USER_ERROR" });
    }
  };

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    return (
      <div><br/>
      {this.state.emptyError === true && (
          <Alert className="error" style={{}} severity="error">
            Please fill out both fields before submitting
          </Alert>
        )}
{this.state.retypeError === true && (
          <Alert className="error" style={{}} severity="error">
            The two passswords do not match. Please try again
          </Alert>
        )}

        <center><h1>
          Update User Password
        </h1></center>
        
        <Paper elevation={5}
        style={{margin:'2%', padding:'2%'}}>
        <Form>
        <center>
          <Row>
            
            <Col>
              <Form.Label>Reset Password</Form.Label>
              <Form.Control
                placeholder="Reset Password"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor("password")}
                style={{width:'45%'}}
              />
            </Col>
            
            <Col>
              <Form.Label>Retype Password</Form.Label>
              <Form.Control
                placeholder="Retype Password"
                type="password"
                name="password"
                value={this.state.retypePassword}
                onChange={this.handleInputChangeFor("retypePassword")}
                style={{width:'45%'}}
              />
            </Col>
          </Row>
          </center>
          <center>
          <Button
            onClick={(event) => this.updatePassword(event)}
            variant="success"
            type="submit"
            style={{ width: "20%", margin:'2%'}}
          >
            Update Password
          </Button></center>
        </Form>
        </Paper>
        
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  users: state.users.userlist,
});

export default connect(mapStateToProps)(UpdatePassword);
