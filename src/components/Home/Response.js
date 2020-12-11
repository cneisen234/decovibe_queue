import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import MUITable from "../MUITable/MUITable";
import swal from "sweetalert";
import ReactFilestack from "filestack-react";
import { Paper, TextField } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import ViewListIcon from "@material-ui/icons/ViewList";
import DeleteIcon from "@material-ui/icons/Delete";
import FlagIcon from "@material-ui/icons/Flag";
import { Alert } from "@material-ui/lab";
import Form from "react-bootstrap/Form";

class Response extends Component {
  state = {
    toggle2: false,
    toggle3: false,
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
    comments: "",
    dataSelector: [],
    priority: "",
    canned: "",
    canned_edit: "",
    comment_id: "",
    error: false,
    payment_link: null,
  };
  componentDidMount() {
    this.props.dispatch({
      type: "GET_RESPOND_LIST",
    });
      this.props.dispatch({
        type: "GET_REPLIES",
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
    this.props.dispatch({
      type: "DELETE_HISTORY_RANGE",
    });
  }

  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value }); //sets to value of targeted event
  }; //end handleChange
  //toggles window
  toggle = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
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
  toggle2 = () => {
    this.setState({
      toggle2: !this.state.toggle2,
    });
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
  toggle4 = () => {
    this.setState({
      toggle4: !this.state.toggle4,
    });
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
  assignTask = (event) => {
    //prevents default action
    event.preventDefault();
    const { id, assigned } = this.state;
    this.props.dispatch({
      type: "ASSIGN_CUSTOM_TASK",
      payload: {
        id: id,
        assigned: assigned,
      },
    });
    this.setState({
      toggle: false,
    });
    this.props.dispatch({
      type: "GET_CUSTOM_ITEM_LIST",
    });
      this.props.dispatch({
        type: "GET_RESPOND_LIST",
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

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    let dataSelector = this.state.dataSelector;
    const data = this.props.respondlist.map((respond) => [
      respond.order_number,
      respond.sku,
      respond.description,
      respond.qty,
      respond.first_name,
      respond.last_name,
      respond.approve,
      respond.assigned,
      respond.comments,
      respond.created_at,
      respond.priority,
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>Customer Response</h1>
        </center>

        <div style={{ padding: "1.5%" }}>
          <Button
            variant="success"
            onClick={(event) => {
              event.preventDefault();
              console.log(dataSelector);
              swal({
                title: "Mark Complete?",
                text:
                  "The customer has approved this order! Click 'ok' to mark as complete",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  for (let index = 0; index < dataSelector.length; index++) {
                    const element = dataSelector[index];
                    this.props.dispatch({
                      type: "MARK_COMPLETE",
                      payload: {
                        id: element.id,
                        email: element.email,
                        first_name: element.first_name,
                        last_name: element.last_name,
                        order_number: element.order_number,
                        sku: element.sku,
                        description: element.description,
                        product_length: element.product_length,
                        product_options: element.product_options,
                        qty: element.qty,
                        assigned: element.assigned,
                        created_at: element.created_at,
                      },
                    });
                    this.props.dispatch({
                      type: "DELETE_RESPOND",
                      payload: element.id,
                    });
                  }
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
                  let checkInput = document.getElementsByTagName("input");
                  for (let index = 0; index < checkInput.length; index++) {
                    const element = checkInput[index];
                    console.log(element.checked);
                    element.checked = false;
                  }

                  dataSelector = [];
                  this.setState({
                    dataSelector: [],
                    toggle3: false,
                  });
                } else {
                  console.log("action canceled");
                }
              });
            }}
          >
            <AssignmentTurnedInIcon></AssignmentTurnedInIcon>
          </Button>
          <Button
            variant="danger"
            onClick={(event) => {
              event.preventDefault();
              console.log(dataSelector);
              for (let index = 0; index < dataSelector.length; index++) {
                const element = dataSelector[index];
                this.props.dispatch({
                  type: "MARK_PRIORITY_RESPOND",
                  payload: {
                    id: element.id,
                    priority: "high",
                  },
                });
              }
              this.props.dispatch({
                type: "GET_RESPOND_LIST",
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
              let checkInput = document.getElementsByTagName("input");
              for (let index = 0; index < checkInput.length; index++) {
                const element = checkInput[index];
                console.log(element.checked);
                element.checked = false;
              }
              dataSelector = [];
              this.setState({
                dataSelector: [],
                toggle3: false,
              });
            }}
          >
            <FlagIcon></FlagIcon>
          </Button>
          <Button
            variant="success"
            onClick={(event) => {
              event.preventDefault();
              for (let index = 0; index < dataSelector.length; index++) {
                const element = dataSelector[index];
                this.props.dispatch({
                  type: "MARK_PRIORITY_RESPOND",
                  payload: {
                    id: element.id,
                    priority: "low",
                  },
                });
              }
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
              let checkInput = document.getElementsByTagName("input");
              for (let index = 0; index < checkInput.length; index++) {
                const element = checkInput[index];
                element.checked = false;
              }
              dataSelector = [];
              this.setState({
                dataSelector: [],
                toggle3: false,
              });
            }}
          >
            <FlagIcon></FlagIcon>
          </Button>
          <Button
            variant="danger"
            onClick={(event) => {
              event.preventDefault();
              console.log(dataSelector);
              swal({
                title: "Are you sure?",
                text:
                  "Once deleted, you will not be able to recover the sku on these orders!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              }).then((willDelete) => {
                if (willDelete) {
                  for (let index = 0; index < dataSelector.length; index++) {
                    const element = dataSelector[index];
                    this.props.dispatch({
                      type: "DELETE_RESPOND",
                      payload: element.id,
                    });
                  }
                  this.props.dispatch({
                    type: "GET_RESPOND_LIST",
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
                  let checkInput = document.getElementsByTagName("input");
                  for (let index = 0; index < checkInput.length; index++) {
                    const element = checkInput[index];
                    console.log(element.checked);
                    element.checked = false;
                  }
                  dataSelector = [];
                  this.setState({
                    dataSelector: [],
                    toggle3: false,
                  });
                } else {
                  console.log("delete canceled");
                }
              });
            }}
          >
            <DeleteIcon></DeleteIcon>
          </Button>
          <MUITable
            data={data}
            columns={[
              //names the columns found on MUI table
              {
                name: "Select",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                      <input
                        type="checkbox"
                        id={dataIndex}
                        style={{ cursor: "pointer" }}
                        name=""
                        value=""
                        onClick={(event) => {
                          let checkChecked = document.getElementById(dataIndex)
                            .checked;
                          const itemArray = this.props.respondlist;
                          const item = itemArray[dataIndex];
                          if (checkChecked === true) {
                            dataSelector.push(item);
                          } else {
                            for (
                              let index = 0;
                              index < dataSelector.length;
                              index++
                            ) {
                              const element = dataSelector[index];
                              if (item.id === element.id) {
                                dataSelector.splice(index, 1);
                              }
                            }
                          }
                        }}
                      ></input>
                    );
                  },
                },
              },
              { name: "Order Number" },
              { name: "SKU" },
              { name: "Description" },
              { name: "QTY" },
              { name: "First Name" },
              { name: "Last Name" },
              { name: "Approved" },
              { name: "Assigned" },
              { name: "Comments" },
              { name: "Created At" },
              { name: "Priority" },
              {
                name: "View Details",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                      this.props.respondlist[dataIndex] && (
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
                            console.log(
                              "this is state",
                              this.state.order_number
                            );
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
                      )
                    );
                  },
                },
              },
              {
                name: "Mark Complete",
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
                          }).then((willDelete) => {
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
                                  description: item.description,
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
                            } else {
                              console.log("action canceled");
                            }
                          });
                        }}
                      >
                        <AssignmentTurnedInIcon></AssignmentTurnedInIcon>
                      </Button>
                    ) : (
                      <span></span>
                    );
                  },
                },
              },
              {
                name: "Mark Priority",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return this.props.respondlist[dataIndex] &&
                      this.props.respondlist[dataIndex].priority === "low" ? (
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.respondlist;
                          const item = itemArray[dataIndex];
                          this.props.dispatch({
                            type: "MARK_PRIORITY_RESPOND",
                            payload: {
                              id: item.id,
                              priority: "high",
                            },
                          });
                          this.props.dispatch({
                            type: "GET_RESPOND_LIST",
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
                        }}
                      >
                        <FlagIcon></FlagIcon>
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.respondlist;
                          const item = itemArray[dataIndex];
                          this.props.dispatch({
                            type: "MARK_PRIORITY_RESPOND",
                            payload: {
                              id: item.id,
                              priority: "low",
                            },
                          });
                          this.props.dispatch({
                            type: "GET_RESPOND_LIST",
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
                        }}
                      >
                        <FlagIcon></FlagIcon>
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
                          swal({
                            title: "Are you sure?",
                            text:
                              "Once deleted, you will not be able to recover the sku on this order!",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                          }).then((willDelete) => {
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
                            } else {
                              console.log("delete canceled");
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
     
            //...else render the details window
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
                    marginLeft: "200px",
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
                      //define pic as pic and concatnate the index number, this should match with state
                      let pic = "pic" + newIndex;
                      let filename = "filename" + newIndex;
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
                            <tr>
                              <td>
                                <a href={this.state[pic]} target="_blank">
                                  <b>{this.state[filename]}</b>
                                </a>
                              </td>
                            </tr>
                          ) : (
                            <span></span>
                          )}
                        </>
                      );
                    }
                  })}{" "}
                  <br />
                  <br />
                  <tr>
                    <td>
                      {" "}
                      <TextField
                        style={{
                          width: "50%",
                        }}
                        variant="outlined"
                        label="Customer email"
                        name="edit"
                        placeholder="...enter email"
                        // value of local state as text value
                        value={this.state.email}
                        type="text"
                        maxLength={10000}
                        //runs handleChange on input change
                        onChange={(event) => this.handleChange(event, "email")}
                      />
                    </td>
                  </tr>
                  <br />
                  <br />
                  <tr>
                    <td>
                      {" "}
                      <TextField
                        style={{
                          width: "50%",
                        }}
                        variant="outlined"
                        label="Payment link"
                        name="edit"
                        placeholder="...enter payment link"
                        // value of local state as text value
                        value={this.state.payment_link}
                        type="text"
                        maxLength={10000}
                        //runs handleChange on input change
                        onChange={(event) =>
                          this.handleChange(event, "payment_link")
                        }
                      />
                    </td>
                  </tr>
                  <br />
                  <br />
                  <tr>
                    <td>
                      <Form.Control
                        as="select"
                        onChange={(event) =>
                          this.setState({
                            comments: event.target.value,
                            canned_edit: event.target.value,
                          })
                        }
                        style={{
                          width: "50%",
                        }}
                      >
                        <option value="">Canned Responses</option>{" "}
                        {this.props.replieslist
                          ? this.props.replieslist.map((item) => (
                              <option key={item.id} value={item.reply}>
                                {" "}
                                {String(item.reply)}{" "}
                              </option>
                            ))
                          : ""}
                      </Form.Control>
                    </td>
                  </tr>
                  <br />
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
                        onChange={(event) =>
                          this.handleChange(event, "comments")
                        }
                      />
                    </td>
                  </tr>
                  <br />
                  <br />
                  <tr>
                    <td>
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          this.props.dispatch({
                            type: "CANNED",
                            payload: {
                              canned: this.state.comments,
                            },
                          });
                          this.setState({
                            canned: "",
                          });
                          this.props.dispatch({
                            type: "GET_REPLIES",
                          });
                        }}
                      >
                        Add Canned Response
                      </Button>
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();

                          event.preventDefault();
                          this.props.dispatch({
                            type: "CANNED_EDIT",
                            payload: {
                              canned: this.state.canned_edit,
                              comments: this.state.comments,
                            },
                          });
                          this.props.dispatch({
                            type: "GET_REPLIES",
                          });
                        }}
                      >
                        Edit Canned Response
                      </Button>
                      <Button
                        variant="danger"
                        onClick={(event) => {
                          event.preventDefault();
                          let canned_edit = this.state.canned_edit
                          if (canned_edit.slice(canned_edit.length - 1) === "?") {
                            canned_edit = canned_edit.slice(0, canned_edit.length - 1)
                            canned_edit = canned_edit + "1"

                          }
                          console.log(canned_edit)
                          this.props.dispatch({
                            type: "CANNED_DELETE",
                            payload: canned_edit,
                          });
                          this.props.dispatch({
                            type: "GET_REPLIES",
                          });
                        }}
                      >
                        Delete Canned Response
                      </Button>
                    </td>
                  </tr>
                  <br />
                  <br />
                  <tr>
                    <td>
                      <Button
                        variant="success"
                        onClick={(event) => {
                          if (
                            this.state.pic1 === "" &&
                            this.state.pic2 === "" &&
                            this.state.pic3 === "" &&
                            this.state.pic4 === "" &&
                            this.state.pic5 === "" &&
                            this.state.pic6 === "" &&
                            this.state.pic7 === "" &&
                            this.state.pic8 === "" &&
                            this.state.pic9 === "" &&
                            this.state.pic10 === "" &&
                            this.state.pic11 === "" &&
                            this.state.pic12 === "" &&
                            this.state.pic13 === "" &&
                            this.state.pic14 === "" &&
                            this.state.pic15 === "" &&
                            this.state.pic16 === "" &&
                            this.state.pic17 === "" &&
                            this.state.pic18 === "" &&
                            this.state.pic19 === "" &&
                            this.state.pic20 === ""
                          ) {
                            this.setState({
                              error: true,
                            });
                            //...set it back to false after 5 secondss
                            setTimeout(() => {
                              this.setState({
                                error: false,
                              });
                            }, 5000);
                            return;
                          } else {
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
                                description: this.state.description,
                                qty: this.state.qty,
                                assigned: this.state.assigned,
                                created_at: this.state.created_at,
                                priority: this.state.priority,
                                payment_link: this.state.payment_link,
                              },
                            });
                            this.props.dispatch({
                              type: "DELETE_CUSTOM_ITEM",
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
                          }
                        }}
                      >
                        Send to Customer
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {this.state.error === true && (
                        <Alert className="error" style={{}} severity="error">
                          {"Don't forget the upload :)"}
                        </Alert>
                      )}
                    </td>
                  </tr>
                  <br />
                  <br />
                  <tr>
                    <td>
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
                </table>
                {/* toggles edit window back to not displaying */}
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
  replieslist: state.item.replieslist,
});
export default connect(mapStateToProps)(Response);
