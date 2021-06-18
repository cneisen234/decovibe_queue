import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  TextField,
} from "@material-ui/core";
import Button from "react-bootstrap/Button";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";
import Paper from "@material-ui/core/Paper";
import ReactFilestack from "filestack-react";

class CustomerPage extends Component {
  state = {
    toggle: false,
    toggle2: false,
    approve: "no",
    comments: null,
    token: "",
    error: false,
    pic1: "",
    pic2: "",
    pic3: "",
    pic4: "",
    pic5: "",
    pic6: "",
    pic7: "",
    pic8: "",
    pic9: "",
    pic10: "",
    pic11: "",
    pic12: "",
    pic13: "",
    pic14: "",
    pic15: "",
    pic16: "",
    pic17: "",
    pic18: "",
    pic19: "",
    pic20: "",
    filename1: "",
    filename2: "",
    filename3: "",
    filename4: "",
    filename5: "",
    filename6: "",
    filename7: "",
    filename8: "",
    filename9: "",
    filename10: "",
    filename11: "",
    filename12: "",
    filename13: "",
    filename14: "",
    filename15: "",
    filename16: "",
    filename17: "",
    filename18: "",
    filename19: "",
    filename20: "",
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
  toggle2 = () => {
    this.setState({
      toggle2: !this.state.toggle2,
    });
    this.props.dispatch({
      type: "ORDER_DETAILS",
      payload: {
        order_number: this.props.confirmlist[0].order_number,
      },
    });
  };
  //this function sends information to the server to store in the database
  submitInfo = (event) => {
    //prevents any default actions
    event.preventDefault();
     let filename = [];
    //grabs local state and defines it in a var of the same name
    const { approve, comments, token, pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15, pic16, pic17, pic18, pic19, pic20 } = this.state;
    if (pic1 !== "") {
      filename.push(`file1: ${pic1}<br><br>`)
    } 
    if (pic2 !== "") {
      filename.push(`file2: ${pic2}<br><br>`);
    } 
    if (pic3 !== "") {
      filename.push(`file3: ${pic3}<br><br>`);
    } 
    if (pic4 !== "") {
      filename.push(`file4: ${pic4}<br><br>`);
    } 
    if (pic5 !== "") {
      filename.push(`file5: ${pic5}<br><br>`);
    } 
    if (pic6 !== "") {
      filename.push(`file6: ${pic6}<br><br>`);
    } 
    if (pic7 !== "") {
      filename.push(`file7: ${pic7}<br><br>`);
    } 
    if (pic8 !== "") {
      filename.push(`file8: ${pic8}<br><br>`);
    } 
    if (pic9 !== "") {
      filename.push(`file9: ${pic9}<br><br>`);
    } 
    if (pic10 !== "") {
      filename.push(`file10: ${pic10}<br><br>`);
    } 
    if (pic11 !== "") {
      filename.push(`file11: ${pic11}<br><br>`);
    } 
    if (pic12 !== "") {
      filename.push(`file12: ${pic12}<br><br>`);
    } 
    if (pic13 !== "") {
      filename.push(`file13: ${pic13}<br><br>`);
    } 
    if (pic14 !== "") {
      filename.push(`file14: ${pic14}<br><br>`);
    } 
    if (pic15 !== "") {
      filename.push(`file15: ${pic15}<br><br>`);
    } 
    if (pic16 !== "") {
      filename.push(`file16: ${pic16}<br><br>`);
    } 
    if (pic17 !== "") {
      filename.push(`file17: ${pic17}<br><br>`);
    } 
    if (pic18 !== "") {
      filename.push(`file18: ${pic18}<br><br>`);
    } 
    if (pic19 !== "") {
      filename.push(`file19: ${pic19}<br><br>`);
    } 
    if (pic20 !== "") {
      filename.push(`file20: ${pic20}<br><br>`);
    }
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
        html: `Please review your message below:<br><br>
              Your Feedback: ${comments} <br><br>
              Your uploaded files: <br><br> ${filename}
              Click "confirm" to send this message to the art department<br/><br/>
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
              pic1: pic1,
              pic2: pic2,
              pic3: pic3,
              pic4: pic4,
              pic5: pic5,
              pic6: pic6,
              pic7: pic7,
              pic8: pic8,
              pic9: pic9,
              pic10: pic10,
              pic11: pic11,
              pic12: pic12,
              pic13: pic13,
              pic14: pic14,
              pic15: pic15,
              pic16: pic16,
              pic17: pic17,
              pic18: pic18,
              pic19: pic19,
              pic20: pic20,
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
                      <p>
                        Indicate in detail the changes or respond accordingly to
                        the artists questions or comments. <br />
                        <i>This is not an approval of Artwork</i>
                      </p>
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
                        onChange={(event) =>
                          this.handleChange(event, "comments")
                        } //onChange of input values set local state
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
                    <table>
                      <tr>
                        <td>
                          <Button variant="success" onClick={this.toggle2}>
                            Upload Artwork
                          </Button>
                        </td>
                      </tr>
                    </table>
                  </form>
                </Paper>
                <br />{" "}
                {/*Add a little buffer on the bottom of page (prevent cutoff on mobile) */}
                <br />
                {this.state.toggle2 === false ? (
                  //if toggle2 is false, render nothing. This is the default
                  <span></span>
                ) : (
                  //...else render the assign window
                  <Paper
                    style={{
                      right: 0,
                      bottom: 0,
                      position: "fixed",
                      borderRadius: "5%",
                      height: "100%",
                      minWidth: "320px",
                      width: "30%",
                      zIndex: "1000000000",
                      border: "50px",
                      overflow: "scroll",
                      fontSize: "15px",
                      backgroundColor: "white",
                    }}
                    elevation="24"
                    className="loginBox"
                  >
                    {this.props.detailslist.map((item, index) => {
                      let newIndex = index + 1;
                      //define pic as pic and concatnate the index number
                      let pic = "pic" + newIndex;
                      let filename = "filename" + newIndex;
                      let itemname = item.name;
                      let itemsku = item.sku;
                      let itemqty = item.quantity;
                      let decoSku = itemsku;
                      let decoSku3 = decoSku.slice(0, 6);
                      let decoSku4 = decoSku.slice(0, 5);
                      let decoSku7 = decoSku.slice(0, 7);
                      let decoSku6 = decoSku.slice(0, 8);
                      if (
                        //if the sliced skus meet the below conditions
                        decoSku4 === "BL_A3" ||
                        decoSku4 === "BL_A4" ||
                        decoSku4 === "BL_A5" ||
                        decoSku4 === "BL_LC" ||
                        decoSku4 === "BL_SM" ||
                        decoSku3 === "HW_CAP" ||
                        decoSku3 === "PR_BAG" ||
                        decoSku3 === "PR_UM_" ||
                        decoSku4 === "SB_A5" ||
                        decoSku4 === "SB_A4" ||
                        decoSku4 === "SB_A3" ||
                        decoSku4 === "SB_LC" ||
                        decoSku4 === "SB_SM" ||
                        decoSku4 === "SB_LS" ||
                        decoSku4 === "WE_SM" ||
                        decoSku4 === "WE_LC" ||
                        decoSku4 === "WE_A5" ||
                        decoSku4 === "WE_A4" ||
                        decoSku4 === "WE_A3" ||
                        decoSku4 === "WE_SQ" ||
                        decoSku4 === "WE_XS" ||
                        decoSku7 === "DYESUB-" ||
                        decoSku4 === "FINAL" ||
                        decoSku6 === "FEE-VECT"
                      ) {
                        return (
                          <>
                            <tr>
                              <td
                                style={{
                                  marginLeft: "3%",
                                  padding: "10px",
                                  width: "25%",
                                }}
                              >
                                <b>Name:</b> {itemname}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  marginLeft: "3%",
                                  padding: "10px",
                                  width: "25%",
                                }}
                              >
                                <b>Sku:</b> {itemsku}
                              </td>
                            </tr>
                            <tr>
                              <td
                                style={{
                                  marginLeft: "3%",
                                  padding: "10px",
                                  width: "25%",
                                }}
                              >
                                <b>QTY:</b> {itemqty}
                              </td>
                            </tr>
                            <tr></tr>
                            {item.product_options.map((product, index) => {
                              let display_name = product.display_name;
                              let display_value = product.display_value;
                              let new_display_name = display_name.slice(0, 10);
                              return (
                                <>
                                  {new_display_name === "Sheet Size" ? (
                                    //if sheet size, cut off extra text
                                    <tr>
                                      <td
                                        style={{
                                          marginLeft: "3%",
                                          padding: "10px",
                                          width: "25%",
                                        }}
                                      >
                                        <b>{new_display_name}:</b>{" "}
                                        {display_value}
                                      </td>
                                    </tr>
                                  ) : display_name === "Transfer Count" ||
                                    display_name === "Upload File" ||
                                    new_display_name === "Sheet Size" ||
                                    display_name === "Size of Design" ||
                                    display_name ===
                                      "Supacolor - Production time" ||
                                    display_name ===
                                      "Supacolor - 5 Day Cancellation" ? (
                                    <span></span>
                                  ) : (
                                    <tr>
                                      <td
                                        style={{
                                          marginLeft: "3%",
                                          padding: "10px",
                                          width: "25%",
                                        }}
                                      >
                                        <b>{display_name}:</b> {display_value}
                                      </td>
                                    </tr>
                                  )}
                                </>
                              );
                            })}{" "}
                            <br />
                            <br />
                            <tr>
                              <td>
                                {/* filestack for photo uploads */}
                                <ReactFilestack
                                  apikey={"AkS9hL8R9Tu1Pep8RcLwEz"}
                                  componentDisplayMode={{
                                    customText: "Upload artwork",
                                    customClass: "picUploader",
                                  }}
                                  onSuccess={(res) =>
                                    this.setState({
                                      //path for uploaded file, set it to state to get ready to send, up to 20 can be selected
                                      [pic]: res.filesUploaded[0].url,
                                      [filename]:
                                        res.filesUploaded[0].originalPath,
                                    })
                                  }
                                />
                                Uploaded file
                              </td>
                            </tr>
                            {this.state[pic] !== "" ? (
                              <>
                                <tr>
                                  <td>
                                    <a
                                      href={this.state[pic]}
                                      rel="noopener noreferrer"
                                      target="_blank"
                                    >
                                      <b>{this.state[filename]}</b>
                                    </a>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <img
                                      src={this.state[pic]}
                                      alt="Upload File"
                                      width="150"
                                      height="150"
                                    ></img>
                                  </td>
                                </tr>
                              </>
                            ) : (
                              <span></span>
                            )}
                            <tr>
                              <td>
                                ----------------------------------------------
                              </td>
                            </tr>
                          </>
                        );
                      }
                      return null;
                    })}{" "}
                    <td
                      style={{
                        backgroundColor: "white",
                        padding: "5%",
                      }}
                    >
                      <Button
                        onClick={this.toggle2}
                        variant="success"
                        type="submit"
                      >
                        Confirm Uploads
                      </Button>
                    </td>
                  </Paper>
                )}
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
                  <br /> The art department will follow up with you after
                  they've reviewed your response
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
  detailslist: state.item.detailslist,
  historylist: state.item.historylist,
  historylisttable: state.item.historylisttable,
});

export default withRouter(connect(mapStateToProps)(CustomerPage));
