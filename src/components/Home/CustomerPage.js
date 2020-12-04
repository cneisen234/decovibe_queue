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

//The purpose of this page is to capture the student's activity for the past pay period
class CustomerPage extends Component {
  state = {
    approve: null,
    comments: null,
    token: "",
    error: false
  };

  componentWillMount() {}

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

  //this function sends user information to the server to store in the database
  submitInfo = (event) => {
    //prevents any default actions
    event.preventDefault();
    //grabs local state and defines it in a var of the same name
    const {approve, comments, token} = this.state;
    //don't run function if any of these values below are null
        if (
          approve === null ||
        comments === null
        ) {
          //...if they are null set error state to true to conditionally render alert toast
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
        }

    //begin sweetAlerts
    Swal.fire({
      title: "Please confirm details below",
      html: `1. Approve: ${approve} <br/>
      2. Comments: ${comments}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#5cb85c",
      cancelButtonColor: "#fcb70a",
      confirmButtonText: "Confirm my entry",
    }).then((result) => {
      //end sweetAlerts

      //on confirm run the dispatch to send makeEntry info over to redux sagas
      if (result.value) {
        this.props.dispatch({
          type: "CUSTOMER_RESPONSE",
          payload: {approve: approve,
        comments: comments,
    token: token},
        });
        //begin sweetAlerts
        Swal.fire(
          "Success!",
          "Your feedback has been submitted to the art department",
          "success"
        ); //end sweetAlerts
      }
    });
  }; //ends SubmitInfo

  render() {
    return (
      <div>
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
          {/* start form for make entry */}
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
            <p>2. Please leave any comments you have below</p>
            <TextField //box for student to enter in text
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
            />{" "}
            <center>
              <Button //button that, one clicked, submits the entry to the database
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

export default withRouter(connect(mapStateToProps)(CustomerPage));
