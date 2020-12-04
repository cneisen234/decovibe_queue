import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import moment from "moment";
import MUITable from "../MUITable/MUITable";
import swal from "sweetalert";
import ReactFilestack from "filestack-react";
import { Paper, TextField } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ViewListIcon from "@material-ui/icons/ViewList";
import DeleteIcon from "@material-ui/icons/Delete";

class Response extends Component {
  state = {
    toggle2: false,
    email: "",
    first_name: "",
    last_name: "",
    order_number: "",
    product_options: "",
    qty: "",
    id: "",
    sku: "",
    qty: "",
    assigned: "",
    created_at: "",
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
    comments: "",
  };
  componentDidMount() {
    this.props.dispatch({
      type: "GET_RESPOND_LIST",
    });
    this.props.dispatch({
      type: "GET_CUSTOM_ITEM_LIST",
    });
    this.props.dispatch({
      type: "GET_ITEM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_RESPOND_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_CUSTOM_ITEM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_CONFIRM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_PROGRESS_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_COMPLETE_LIST_COUNT",
    });
    this.props.dispatch({
      type: "DELETE_COMPLETE_RANGE",
    });
  }

  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value }); //sets to value of targeted event
  }; //end handleChange

  toggle2 = () => {
    this.setState({
      toggle2: !this.state.toggle2,
    });
    this.props.dispatch({
      type: "GET_CUSTOM_ITEM_LIST",
    });
    this.props.dispatch({
      type: "GET_ITEM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_RESPOND_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_CONFIRM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_CUSTOM_ITEM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_PROGRESS_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_COMPLETE_LIST_COUNT",
    });
  };

  render() {
    const data = this.props.respondlist.map((respond) => [
      respond.order_number,
      respond.sku,
      respond.qty,
      respond.first_name,
      respond.last_name,
      respond.approve,
      respond.assigned,
      respond.comments,
      respond.created_at,
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>Customer Response</h1>
        </center>

        <div style={{ padding: "1.5%" }}>
          <MUITable
            data={data}
            columns={[
              //names the columns found on MUI table
              { name: "Order Number" },
              { name: "SKU" },
              { name: "QTY" },
              { name: "First Name" },
              { name: "Last Name" },
              { name: "Approved" },
              { name: "Assigned" },
              { name: "Comments" },
              { name: "Created At" },
              {
                name: "Review",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    
                    return this.props.respondlist[dataIndex] &&
                      this.props.respondlist[dataIndex].approve === "Yes" ? (
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.respondlist;
                          const item = itemArray[dataIndex];

                          swal({
                            title: "Mark Complete?",
                            text:
                              "The customer has approved this order! Click 'ok' to mark as complete",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                            //end sweet alerts
                          }).then((willDelete) => {
                            // start .then
                            //if confirmed, delete
                            if (willDelete) {
                              this.props.dispatch({
                                type: "MARK_COMPLETE",
                                payload: {
                                  id: item.id,
                                  email: item.email,
                                  first_name: item.first_name,
                                  last_name: item.last_name,
                                  order_number: item.order_number,
                                  sku: item.sku,
                                  product_length: item.product_length,
                                  product_options: item.product_options,
                                  qty: item.qty,
                                  assigned: item.assigned,
                                  created_at: item.created_at,
                                },
                              });
                              this.props.dispatch({
                                type: "DELETE_RESPOND",
                                payload: item.id,
                              });
                              this.props.dispatch({
                                type: "GET_PROGRESS_LIST",
                              });
                              this.props.dispatch({
                                type: "GET_ITEM_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_RESPOND_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_CONFIRM_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_CUSTOM_ITEM_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_PROGRESS_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_COMPLETE_LIST_COUNT",
                              });
                              swal("This sku has been marked complete!", {
                                icon: "success",
                              });
                            } else {
                              //...else cancel action
                              swal("Action canceled!");
                            }
                          });
                        }}
                      >
                        <AssignmentTurnedInIcon></AssignmentTurnedInIcon>
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.respondlist;
                          const item = itemArray[dataIndex];
                          const order_number = item.order_number;
                          const sku = item.sku;
                          const email = item.email;
                          const first_name = item.first_name;
                          const last_name = item.last_name;
                          const qty = item.qty;
                          const assigned = item.assigned;
                          const created_at = item.created_at;
                          const id = item.id;
                          console.log("this is item", item);
                          console.log("this is order_number", order_number);
                          this.setState({
                            toggle2: !this.state.toggle2,
                            id: item.id,
                            order_number: order_number,
                            sku: sku,
                            email: email,
                            first_name: first_name,
                            last_name: last_name,
                            qty: qty,
                            assigned: assigned,
                            created_at: created_at,
                            id: id,
                          });
                          console.log("this is state", this.state.order_number);
                          this.props.dispatch({
                            type: "ORDER_DETAILS",
                            payload: {
                              order_number: order_number,
                            },
                          });
                          console.log(
                            "this is details",
                            this.props.detailslist
                          );
                        }}
                      >
                        <ViewListIcon></ViewListIcon>
                      </Button>
                    );
                  },
                },
              },
              {
                name: "Delete",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                      <Button
                        variant="danger"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.respondlist;

                          const item = itemArray[dataIndex];
                          console.log(`entry id should be: ${item.id}`);
                          // alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)

                          swal({
                            title: "Are you sure?",
                            text:
                              "Once deleted, you will not be able to recover the sku on this order!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                            //end sweet alerts
                          }).then((willDelete) => {
                            // start .then
                            //if confirmed, delete
                            if (willDelete) {
                              this.props.dispatch({
                                type: "DELETE_RESPOND",
                                payload: item.id,
                              });
                              this.props.dispatch({
                                type: "GET_PROGRESS_LIST",
                              });
                              this.props.dispatch({
                                type: "GET_ITEM_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_RESPOND_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_CONFIRM_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_CUSTOM_ITEM_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_PROGRESS_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_COMPLETE_LIST_COUNT",
                              });
                              //success! review deleted
                              swal(
                                "Poof! The sku on the order has been deleted!",
                                {
                                  icon: "success",
                                }
                              );
                            } else {
                              //...else cancel action
                              swal("The sku is safe!");
                            }
                          });
                        }}
                      >
                        <DeleteIcon></DeleteIcon>
                      </Button>
                    );
                  },
                },
              },
            ]}
            title={"Items Customer Responded To"} //give the table a name
          />
        </div>
        <br />
        <br />
        <br />
        {this.state.toggle2 === false ? (
          //if toggle is false, render nothing. This is the default
          <span></span>
        ) : (
          //...else render the edit screen for the selected song
          <Paper
            style={{
              right: 0,
              bottom: 0,
              position: "fixed",
              height: "100%",
              width: "100%",
              zIndex: "1000000000",
              border: "50px",
              overflow: "scroll",
              fontSize: "15px",
              backgroundColor: "white",
            }}
            elevation="24"
            className="loginBox"
          >
            <div
              style={{
                backgroundColor: "white",
              }}
            >
              <table
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "20px",
                  width: "100%",
                }}
              >
                <tr>
                  <td
                    style={{
                      marginLeft: "3%",
                      padding: "10px",
                      width: "25%",
                    }}
                  >
                    {" "}
                    <Button
                      onClick={this.toggle2}
                      variant="success"
                      type="submit"
                    >
                      Close
                    </Button>
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
                    <b>Order Number: </b>{" "}
                    {this.props.detailslist[0] &&
                      this.props.detailslist[0].order_id}
                  </td>
                </tr>
                {this.props.detailslist.map((item, index) => {
                  if (this.state.sku == item.sku) {
                    let newIndex = index + 1;
                    let pic = "pic" + newIndex;
                    let itemname = item.name;
                    let itemsku = item.sku;
                    let itemcost = Number(item.base_price).toFixed(2);
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
                            <b>Price:</b> {itemcost}
                          </td>
                        </tr>
                        {item.product_options.map((product, index) => {
                          let display_name = product.display_name;
                          let display_value = product.display_value;
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
                                  <b>{display_name}:</b> {display_value}
                                </td>
                              </tr>
                            </>
                          );
                        })}{" "}
                        <br />
                        <br />
                        <tr>
                          <td>
                            <ReactFilestack
                              apikey={"AkS9hL8R9Tu1Pep8RcLwEz"}
                              componentDisplayMode={{
                                customText: "Upload artwork",
                                customClass: "picUploader",
                              }}
                              onSuccess={(res) =>
                                this.setState({
                                  //path for uploaded photo to display on dom
                                  [pic]: res.filesUploaded[0].url,
                                })
                              }
                            />
                            Uploaded file
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <b>You're upload:</b>{" "}
                            <img
                              src={this.state[pic]}
                              alt="your upload"
                              width="100"
                              height="100"
                            ></img>
                          </td>
                        </tr>
                      </>
                    );
                  }
                })}{" "}
                <br />
                <tr>
                  <td>
                    <TextField
                      style={{
                        width: "50%",
                      }}
                      //per material UI changes textfield to act like a textarea tag
                      multiline
                      //input field takes up for rows by defaults
                      rows={4}
                      //...will expand up to 8 rows
                      rowsMax={8}
                      variant="outlined"
                      label="Comments"
                      name="edit"
                      placeholder="Comments"
                      // value of local state as text value
                      value={this.state.comments}
                      type="text"
                      maxLength={10000}
                      //runs handleChange on input change
                      onChange={(event) => this.handleChange(event, "comments")}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Button
                      variant="success"
                      onClick={(event) => {
                        event.preventDefault();
                        this.props.dispatch({
                          type: "CUSTOMER_CONFIRM",
                          payload: {
                            pic1: this.state.pic1,
                            pic2: this.state.pic2,
                            pic3: this.state.pic3,
                            pic4: this.state.pic4,
                            pic5: this.state.pic5,
                            pic6: this.state.pic6,
                            pic7: this.state.pic7,
                            pic8: this.state.pic8,
                            pic9: this.state.pic9,
                            pic10: this.state.pic10,
                            pic11: this.state.pic11,
                            pic12: this.state.pic12,
                            pic13: this.state.pic13,
                            pic14: this.state.pic14,
                            pic15: this.state.pic15,
                            pic16: this.state.pic16,
                            pic17: this.state.pic17,
                            pic18: this.state.pic18,
                            pic19: this.state.pic19,
                            pic20: this.state.pic20,
                            comments: this.state.comments,
                            email: this.state.email,
                            first_name: this.state.first_name,
                            last_name: this.state.last_name,
                            order_number: this.state.order_number,
                            sku: this.state.sku,
                            qty: this.state.qty,
                            assigned: this.state.assigned,
                            created_at: this.state.created_at,
                          },
                        });
                       this.props.dispatch({
                         type: "DELETE_RESPOND",
                         payload: this.state.id,
                       });
                        this.props.dispatch({
                          type: "GET_ITEM_LIST",
                        });
                        this.props.dispatch({
                          type: "GET_ITEM_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_RESPOND_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_CUSTOM_ITEM_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_CONFIRM_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_PROGRESS_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_COMPLETE_LIST_COUNT",
                        });
                        this.setState({
                          toggle2: !this.state.toggle2,
                          comments: "",
                        });
                      }}
                    >
                      Send to Customer
                    </Button>
                  </td>
                </tr>
              </table>
              {/* toggles edit window back to not displaying */}
              <Button onClick={this.toggle2} variant="success" type="submit">
                Close
              </Button>
              {JSON.stringify(this.state)}
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </Paper>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customitemlist: state.item.customitemlist,
  respondlist: state.item.respondlist,
  detailslist: state.item.detailslist,
});
export default connect(mapStateToProps)(Response);
