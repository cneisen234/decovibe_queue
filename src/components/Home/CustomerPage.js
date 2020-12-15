import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { green } from "@material-ui/core/colors";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  FormLabel,
  withStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";
import Paper from "@material-ui/core/Paper";
// import "./MakeEntry.css";
import moment from "moment";

const GreenRadio = withStyles({
  // turns the radio button green
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);
class CustomerPage extends Component {
  state = {
    toggle: false,
    approve: null,
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
    if (approve === null) {
      //...if they are null set error state to true to conditionally render alert toast
      this.setState({
        error: true,
      });
      //...set it back to false after 5 seconds
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, 5000);
      //stop the function
      return;
      //repeat with these condtions, if approve is "no" and the comments are left blank
    } else if (approve === 'No' && comments === null) {

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
    } else if (approve === "Yes") {
      //if customer clicks yes, check if the checkboxes are checked
              let checkInput = document.getElementsByClassName("input");
              for (let index = 0; index < checkInput.length; index++) {
                const element = checkInput[index];
                if (element.checked === false) {
                  //...if any are missed, deny action set error to true
                      this.setState({
                        error: true,
                      });
                      //...set it back to false after 5 secondss
                      setTimeout(() => {
                        this.setState({
                          error: false,
                        });
                      }, 5000);
                      //...and stop
                      return;
                }
              }
      //begin sweetAlerts
      Swal.fire({
        title: "Please confirm",
        html: `You are approving the artwork<br/><br/>
        <b>Disclaimer: Once artwork is approved there are no changes or cancellations</b><br/><br/>
        Please click "confirm" to confirm your submission<br/><br/>`,
        icon: "success",
        customClass: {
          actions: "confirm",
        },
        showCancelButton: true,
        confirmButtonColor: "#5cb85c",
        cancelButtonColor: "#fcb70a",
        confirmButtonText: "Confirm",
      }).then((result) => {
        if (result.value) {
          this.props.dispatch({
            type: "CUSTOMER_RESPONSE",
            payload: { approve: approve, comments: comments, token: token },
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
    } else if (approve === "No" && comments !== null) {
      //if "no" is picked and comments have been filled out
            Swal.fire({
              title: "Please confirm",
              html: `You're not approving the artwork<br/><br/>
              Your Feedback: ${comments} <br/><br/>
              Please click "confirm" to send this back to the art department<br/><br/>
              `,
                customClass: {
    actions: 'confirm',
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
            {/* toast that appears on error, shows up when all required fields are not filled in */}
            {this.state.error === true && (
              <Alert className="error" style={{}} severity="error">
                Please fill out all of the required fields
              </Alert>
            )}
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
                <FormControl component="fieldset">
                  <FormLabel component="legend" style={{ color: "black" }}>
                    1. Do you approve the artwork?
                  </FormLabel>
                  <RadioGroup
                    required
                    aria-label="approve"
                    name="approve"
                    // sets the value of the input to the value of state
                    value={this.state.approve}
                    // onChange run handleChange function to update coorasponding state
                    onChange={(event) => this.handleChange(event, "approve")}
                  >
                    <FormControlLabel
                      value="Yes"
                      //calls and renders the green radio button
                      control={<GreenRadio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <br />
                {this.state.approve === null ? (
                  <span></span>
                ) : this.state.approve === "No" ? (
                  <>
                    <p>2. Please leave any comments you have below</p>
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
                ) : (
                  <>
                    <b>I have reviewed and approve the following:</b>
                    {/* check boxes customer needs to check to submit their approval */}
                    <br />
                    <input
                      type="checkbox"
                      className="input"
                      name="transfer"
                      value="Type of Transfer"
                      style={{ cursor: "pointer" }}
                    ></input>
                    <span>Type of Transfer</span>
                    <br />
                    <input
                      type="checkbox"
                      className="input"
                      name="size"
                      value="Transfer size, color and resolution"
                      style={{ cursor: "pointer" }}
                    ></input>
                    <span>Transfer size, color and resolution</span>
                    <br />
                    <input
                      type="checkbox"
                      className="input"
                      name="spelling"
                      value="All spelling and grammar"
                      style={{ cursor: "pointer" }}
                    ></input>
                    <span>All spelling and grammar</span><br/>
                    <input
                      type="checkbox"
                      className="input"
                      name="qty"
                      value="Quantity of each Transfer"
                      style={{ cursor: "pointer" }}
                    ></input>
                    <span>Quantity of each Transfer</span>
                  </>
                )}
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
              <br /> The art department will follow up with you shortly
            </h1>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default withRouter(connect(mapStateToProps)(CustomerPage));
