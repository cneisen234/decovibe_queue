import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  TextField,
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";
import Paper from "@material-ui/core/Paper";

class CustomerPage extends Component {
  state = {
    toggle: false,
    approve: "no",
    comments: null,
    token: "",
    error: false,
  };
  componentDidMount() {
    // grabs the token from the header, this comes in from the token generated
    // this is used for verification purposes
    let token = window.location.hash;
    token = token.slice(103);
    //sets the state with the information above to get it ready to send to
    //the server
    this.setState({
      token: token,
    });
  } //end componentDidMount

  //This function handles storing input values into state on change
  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  }; //end handleChange

  //this function sends information to the server to store in the database
  submitInfo = (event) => {
    //prevents any default actions
    event.preventDefault();
    //grabs local state and defines it in a var of the same name
    const { approve, comments, token } = this.state;
    //don't run function if any of these values below are null
  if (comments === null || comments === "") {
      this.setState({
        error: true,
      });
      //...set it back to false after 5 secondss
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, 5000);
      //stop the function
      return;
    } else {
      //if comments have been filled out
      Swal.fire({
        title: "Please confirm",
        html: `You're requesting changes to your artwork for the following reasons below:<br/><br/>
              Your Feedback: ${comments} <br/><br/>
              Please click "confirm" to send this back to the art department<br/><br/>
              `,
        customClass: {
          actions: "confirm",
        },
        showCancelButton: true,
        confirmButtonColor: "#5cb85c",
        cancelButtonColor: "#fcb70a",
        confirmButtonText: "Confirm",
      }).then((result) => {
        //end sweetAlerts

        //on confirm run the dispatch to send makeEntry info over to redux sagas
        if (result.value) {
          this.props.dispatch({
            type: "CUSTOMER_RESPONSE",
            payload: {
              approve: approve,
              comments: comments,
              token: token,
            },
          });
          //begin sweetAlerts
          Swal.fire(
            "Success!",
            "Your feedback has been submitted to the art department",
            "success"
          ); //end sweetAlerts
          this.setState({
            toggle: !this.state.toggle,
          });
        }
      });
    }
  }; //ends SubmitInfo
  render() {
    return (
      <div>
        {this.state.toggle === false ? (
          <>
            <br />
            <br />
            <Paper
              elevation={5}
              style={{
                padding: "5%",
                marginLeft: "5%",
                marginRight: "5%",
                marginBottom: "5%",
              }}
            >
              <form onSubmit={this.submitInfo}>
                <>
                  <p>Please request changes you have below</p>
                  <TextField
                    style={{
                      backgroundColor: "white",
                      margin: "5px",
                      width: "100%",
                    }}
                    //per material UI changes textfield to act like a textarea tag
                    multiline
                    //input field takes up for rows by defaults
                    rows={4}
                    //...will expand up to 8 rows
                    rowsMax={8}
                    variant="outlined"
                    fullWidth
                    label="Write comments here"
                    name="comments"
                    // sets value of input to local state
                    value={this.state.comments}
                    type="text"
                    maxLength={1000}
                    //onChange of input values set local state
                    onChange={(event) => this.handleChange(event, "comments")} //onChange of input values set local state
                  />
                </>
                <center>
                  <Button
                    style={{
                      //note that it only goes through if it passes all validation
                      marginTop: "3%",
                      marginLeft: "5%",
                      marginRight: "5%",
                      backgroundColor: "green",
                      color: "white",
                    }}
                    variant="contained"
                    type="submit"
                    color="primary"
                    className="button"
                  >
                    Submit Response
                  </Button>
                  {/* toast that appears on error, shows up when all required fields are not filled in */}
                  {this.state.error === true && (
                    <Alert className="error" style={{}} severity="error">
                      Please fill out all of the required fields
                    </Alert>
                  )}
                </center>
              </form>
            </Paper>
            <br />{" "}
            {/*Add a little buffer on the bottom of page (prevent cutoff on mobile) */}
            <br />
          </>
        ) : (
          <>
            <br />
            <br />
            <br />
            <br />
            {/*show this only after the customer has submitted, to confirm submission and also prevent duplicate submissions*/}
            <h1 style={{ textAlign: "center" }}>
              Thank you for your feedback.
              <br /> The art department will follow up with you after they've
              reviewed your response
            </h1>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default withRouter(connect(mapStateToProps)(CustomerPage));
