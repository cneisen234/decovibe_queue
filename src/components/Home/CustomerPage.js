import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Button,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";
import Paper from "@material-ui/core/Paper";
class CustomerPage extends Component {
  state = {
    toggle: false,
    approve: "yes",
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
       this.props.dispatch({
         type: "GET_CONFIRM_LIST",
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
  }; //ends SubmitInfo
  render() {
     let checkThis = false;
     let confirmlist = this.props.confirmlist;
     let token = this.state.token;
     for (let index = 0; index < confirmlist.length; index++) {
       const element = confirmlist[index];
       if (element.token === token) {
         checkThis = true;
       }
       if (checkThis === true) {
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
                         <span>All spelling and grammar</span>
                         <br />
                         <input
                           type="checkbox"
                           className="input"
                           name="qty"
                           value="Quantity of each Transfer"
                           style={{ cursor: "pointer" }}
                         ></input>
                         <span>Quantity of each Transfer</span>
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
                     Thank you for your approval.
                     <br />
                     Please review our website for production details.
                   </h1>
                 </>
               )}
             </div>
           );
       }
     }
     return (
       <Paper
         elevation={5}
         style={{
           padding: "5%",
           marginLeft: "5%",
           marginRight: "5%",
           marginBottom: "5%",
         }}
       >
         <>
           <br />
           <br />
           <br />
           <br />
           {/*show this only after the customer has submitted, to confirm submission and also prevent duplicate submissions*/}
           <h1 style={{ textAlign: "center" }}>
             You've already responded to this email message, <br />
             please wait for the next reply from the art department
           </h1>
         </>
       </Paper>
     );
  }
}

const mapStateToProps = (state) => ({
  confirmlist: state.item.confirmlist,
});

export default withRouter(connect(mapStateToProps)(CustomerPage));
