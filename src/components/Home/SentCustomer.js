import React, { Component } from "react";
import { connect } from "react-redux";
import MUITable from "../MUITable/MUITable";
import { Paper} from "@material-ui/core";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ViewListIcon from "@material-ui/icons/ViewList";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreIcon from "@material-ui/icons/Restore";
import swal from "sweetalert";
class SentCustomer extends Component {
  state = {
    email: "",
    first_name: "",
    last_name: "",
    order_number: "",
    product_options: "",
    qty: "",
    id: "",
    sku: "",
    assigned: "",
    created_at: "",
    item_type: "",
    toggle: false,
    toggle2: false,
  };
  componentDidMount() {
    this.props.dispatch({
      type: "GET_CONFIRM_LIST",
    });
    this.props.dispatch({
      type: "GET_ITEM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_RESPOND_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_APPROVE_LIST_COUNT",
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
  assignTask = (event) => {
    //prevents default action
    event.preventDefault();
    const { id, assigned } = this.state;
    this.props.dispatch({
      type: "ASSIGN_SENT_CUSTOMER",
      payload: {
        id: id,
        assigned: assigned,
      },
    });
    this.setState({
      toggle: false,
    });
   this.props.dispatch({
     type: "GET_CONFIRM_LIST",
   });
    this.props.dispatch({
      type: "GET_ITEM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_RESPOND_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_APPROVE_LIST_COUNT",
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
  checkHistory = (event) => {
    const { email } = this.state;
    this.props.dispatch({
      type: "CHECK_HISTORY",
      payload: {
        email: email,
      },
    });
    this.setState({
      email: email,
    });
  };
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
      type: "GET_APPROVE_LIST_COUNT",
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
    const data = this.props.confirmlist.map((item) => [
      item.order_number,
      item.first_name,
      item.last_name,
      item.item_type,
      item.assigned,
      item.created_at,
      item.priority,
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>Sent To Customer</h1>
        </center>
        <div style={{ padding: "1.5%" }}>
          <br />
          <br />
          <br />
          <MUITable
            data={data}
            columns={[
              //names the columns found on MUI table
              { name: "Order Number" },
              { name: "First Name" },
              { name: "Last Name" },
              { name: "Item Type" },
              {
                name: "Assigned",
                options: {
                  filter: true,
                  sort: true,
                  // empty: true,
                  customBodyRender: (value, tableMeta, updateValue) => {
                    if (value === "Levi") {
                      return (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#5D82C1",
                            color: "black",
                          }}
                        >
                          {value}
                        </div>
                      );
                    } else if (value === "Emily") {
                      return (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#8164AB",
                            color: "white",
                          }}
                        >
                          {value}
                        </div>
                      );
                    } else if (value === "Maggi") {
                      return (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#F9E986",
                            color: "black",
                          }}
                        >
                          {value}
                        </div>
                      );
                    } else if (value === "Zach") {
                      return (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#68C28F",
                            color: "black",
                          }}
                        >
                          {value}
                        </div>
                      );
                    } else {
                      return <div>{value}</div>;
                    }
                  },
                },
              },
              { name: "Created At" },
              { name: "Priority" },
              {
                name: "View Details",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    //shows order details
                    return (
                      <>
                        <Button
                          variant="success"
                          onClick={(event) => {
                            event.preventDefault();
                            const itemArray = this.props.confirmlist;
                            const item = itemArray[dataIndex];
                            const order_number = item.order_number;
                            const sku = item.sku;
                            const description = item.description;
                            const email = item.email;
                            const first_name = item.first_name;
                            const last_name = item.last_name;
                            const qty = item.qty;
                            const assigned = item.assigned;
                            const created_at = item.created_at;
                            const id = item.id;
                            const priority = item.priority;
                            const payment_link = this.state.payment_link;
                            const item_type = item.item_type;
                            this.setState({
                              toggle2: !this.state.toggle2,
                              order_number: order_number,
                              sku: sku,
                              description: description,
                              email: email,
                              first_name: first_name,
                              last_name: last_name,
                              qty: qty,
                              assigned: assigned,
                              created_at: created_at,
                              id: id,
                              priority: priority,
                              payment_link: payment_link,
                              item_type: item_type,
                            });
                            this.props.dispatch({
                              type: "ORDER_DETAILS",
                              payload: {
                                order_number: order_number,
                              },
                            });
                            this.props.dispatch({
                              type: "GET_REPLIES",
                            });
                            setTimeout(() => {
                              this.checkHistory();
                            }, 2000);
                          }}
                        >
                          <ViewListIcon></ViewListIcon>
                        </Button>
                      </>
                    );
                  },
                },
              },
              {
                name: "Assign",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return this.props.user.role === "csr" ? (
                      <span></span>
                    ) : (
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.confirmlist;
                          const item = itemArray[dataIndex];
                          this.setState({
                            toggle: !this.state.toggle,
                            id: item.id,
                          });
                        }}
                      >
                        <AssignmentIndIcon></AssignmentIndIcon>
                      </Button>
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
                    return this.props.user.role === "csr" ? (
                      <span></span>
                    ) : (
                      this.props.confirmlist[dataIndex] && (
                        <Button
                          variant="success"
                          onClick={(event) => {
                            event.preventDefault();
                            const itemArray = this.props.confirmlist;
                            const item = itemArray[dataIndex];
                            let order_id = item.order_number;
                            let uploadArray = [];
                            {
                              this.props.confirmlist.map((orderItem) => {
                                order_id = String(order_id);
                                if (orderItem.order_number === order_id) {
                                  if (
                                    orderItem.upload_url1 !== "" &&
                                    orderItem.upload_url1 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url1);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url2 !== "" &&
                                    orderItem.upload_url2 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url2);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url3 !== "" &&
                                    orderItem.upload_url3 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url3);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url4 !== "" &&
                                    orderItem.upload_url4 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url4);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url5 !== "" &&
                                    orderItem.upload_url5 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url5);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url6 !== "" &&
                                    orderItem.upload_url6 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url1);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url7 !== "" &&
                                    orderItem.upload_url7 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url7);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url8 !== "" &&
                                    orderItem.upload_url8 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url8);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url9 !== "" &&
                                    orderItem.upload_url9 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url9);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url10 !== "" &&
                                    orderItem.upload_url10 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url10);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url11 !== "" &&
                                    orderItem.upload_url11 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url11);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url12 !== "" &&
                                    orderItem.upload_url12 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url12);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url13 !== "" &&
                                    orderItem.upload_url13 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url13);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url14 !== "" &&
                                    orderItem.upload_url14 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url14);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url15 !== "" &&
                                    orderItem.upload_url15 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url15);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url16 !== "" &&
                                    orderItem.upload_url16 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url16);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url17 !== "" &&
                                    orderItem.upload_url17 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url17);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url18 !== "" &&
                                    orderItem.upload_url18 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url18);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url19 !== "" &&
                                    orderItem.upload_url19 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url19);
                                  } else {
                                    uploadArray.push("");
                                  }
                                  if (
                                    orderItem.upload_url20 !== "" &&
                                    orderItem.upload_url20 !== null
                                  ) {
                                    uploadArray.push(orderItem.upload_url20);
                                  } else {
                                    uploadArray.push("");
                                  }
                                }
                              });
                            }
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
                                  type: "MARK_COMPLETE_CUSTOM",
                                  payload: {
                                    id: item.id,
                                    email: item.email,
                                    first_name: item.first_name,
                                    last_name: item.last_name,
                                    item_type: item.item_type,
                                    order_number: item.order_number,
                                    sku: item.sku,
                                    description: item.description,
                                    qty: item.qty,
                                    assigned: item.assigned,
                                    pic1: uploadArray[0],
                                    pic2: uploadArray[1],
                                    pic3: uploadArray[2],
                                    pic4: uploadArray[3],
                                    pic5: uploadArray[4],
                                    pic6: uploadArray[5],
                                    pic7: uploadArray[6],
                                    pic8: uploadArray[7],
                                    pic9: uploadArray[8],
                                    pic10: uploadArray[9],
                                    pic11: uploadArray[10],
                                    pic12: uploadArray[11],
                                    pic13: uploadArray[12],
                                    pic14: uploadArray[13],
                                    pic15: uploadArray[14],
                                    pic16: uploadArray[15],
                                    pic17: uploadArray[16],
                                    pic18: uploadArray[17],
                                    pic19: uploadArray[18],
                                    pic20: uploadArray[19],
                                    created_at: item.created_at,
                                    priority: item.priority,
                                  },
                                });
                                this.props.dispatch({
                                  type: "DELETE_SENT_CUSTOMER",
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
                                  type: "GET_APPROVE_LIST_COUNT",
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
                      )
                    );
                  },
                },
              },
              {
                name: "Go Back to New",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return this.props.user.role === "csr" ? (
                      <span></span>
                    ) : (
                      this.props.confirmlist[dataIndex] && (
                        <Button
                          variant="success"
                          onClick={(event) => {
                            event.preventDefault();
                            const itemArray = this.props.confirmlist;
                            const item = itemArray[dataIndex];
                            swal({
                              title: "Go Back?",
                              text:
                                "This will place the order at the start of the queue",
                              icon: "warning",
                              buttons: true,
                              dangerMode: true,
                            }).then((willDelete) => {
                              if (willDelete) {
                                this.props.dispatch({
                                  type: "BACK_TO_NEW",
                                  payload: {
                                    id: item.id,
                                    email: item.email,
                                    first_name: item.first_name,
                                    last_name: item.last_name,
                                    item_type: item.item_type,
                                    order_number: item.order_number,
                                    sku: item.sku,
                                    description: item.description,
                                    qty: item.qty,
                                    assigned: item.assigned,
                                    created_at: item.created_at,
                                    priority: item.priority,
                                  },
                                });
                                this.props.dispatch({
                                  type: "DELETE_SENT_CUSTOMER",
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
                                  type: "GET_APPROVE_LIST_COUNT",
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
                          <RestoreIcon></RestoreIcon>
                        </Button>
                      )
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
                    return this.props.user.role === "csr" ? (
                      <span></span>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.confirmlist;
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
                                type: "DELETE_SENT_CUSTOMER",
                                payload: item.id,
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
                                type: "GET_APPROVE_LIST_COUNT",
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
                              console.log("deletion canceled");
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
            title={"Items Sent to Customer"} //give the table a name
          />
          {this.state.toggle === false ? (
            //if toggle is false, render nothing. This is the default
            <span></span>
          ) : (
            //...else render the assign window
            <Paper
              style={{
                right: 0,
                bottom: 0,
                position: "fixed",
                borderRadius: "10%",
                height: "600px",
                width: "400px",
                zIndex: "1000000000",
                border: "50px",
                overflow: "scroll",
                fontSize: "15px",
                backgroundColor: "white",
              }}
              elevation="24"
              className="loginBox"
            >
              <td
                style={{
                  backgroundColor: "white",
                  padding: "5%",
                }}
              >
                <br />
                <br />{" "}
                <form onSubmit={this.assignTask}>
                  <Form.Control
                    style={{ width: "300px" }}
                    as="select"
                    onChange={(event) =>
                      this.setState({ assigned: event.target.value })
                    }
                  >
                    <option value="">Pick From Below </option>{" "}
                    <option value="Maggi">Maggi </option>{" "}
                    <option value="Zach">Zach </option>{" "}
                    <option value="Levi">Levi </option>{" "}
                    <option value="Heather">Heather </option>{" "}
                    <option value="Sasha">Sasha </option>{" "}
                    <option value="Emily">Emily </option>{" "}
                  </Form.Control>
                  <br />
                  <Button variant="success" type="submit">
                    Assign
                  </Button>
                </form>
                {/* toggles assign window back to not displaying */}
                <br />
                <br />
                <br />
                <br />
                <br />
                <Button onClick={this.toggle} variant="success" type="submit">
                  Go Back
                </Button>
              </td>
            </Paper>
          )}
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
                    width: "50%",
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
                  <tr className="borderBottom">
                    <td
                      style={{
                        marginLeft: "3%",
                        padding: "10px",
                        width: "25%",
                      }}
                    >
                      <b>Order Number: </b>{" "}
                    </td>
                    <td>
                      {this.props.detailslist[0] &&
                        this.props.detailslist[0].order_id}
                    </td>
                  </tr>
                  {this.props.detailslist.map((item, index) => {
                    //define pic as pic and concatnate the index number
                    let itemname = item.name;
                    let itemsku = item.sku;
                    let itemqty = item.quantity;
                    let order_id = item.order_id;
                    let decoSku = itemsku;
                    let decoSku3 = decoSku.slice(0, 6);
                    let decoSku4 = decoSku.slice(0, 5);
                    let decoSku7 = decoSku.slice(0, 7);
                    let decoSku6 = decoSku.slice(0, 8);
                    let uploadArray = [];
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
                          {this.props.confirmlist.map((orderItem) => {
                            order_id = String(order_id);
                            if (orderItem.order_number === order_id) {
                              if (
                                orderItem.upload_url1 !== "" &&
                                orderItem.upload_url1 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url1);
                              }
                              if (
                                orderItem.upload_url2 !== "" &&
                                orderItem.upload_url2 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url2);
                              }
                              if (
                                orderItem.upload_url3 !== "" &&
                                orderItem.upload_url3 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url3);
                              }
                              if (
                                orderItem.upload_url4 !== "" &&
                                orderItem.upload_url4 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url4);
                              }
                              if (
                                orderItem.upload_url5 !== "" &&
                                orderItem.upload_url5 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url5);
                              }
                              if (
                                orderItem.upload_url6 !== "" &&
                                orderItem.upload_url6 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url1);
                              }
                              if (
                                orderItem.upload_url7 !== "" &&
                                orderItem.upload_url7 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url7);
                              }
                              if (
                                orderItem.upload_url8 !== "" &&
                                orderItem.upload_url8 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url8);
                              }
                              if (
                                orderItem.upload_url9 !== "" &&
                                orderItem.upload_url9 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url9);
                              }
                              if (
                                orderItem.upload_url10 !== "" &&
                                orderItem.upload_url10 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url10);
                              }
                              if (
                                orderItem.upload_url11 !== "" &&
                                orderItem.upload_url11 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url11);
                              }
                              if (
                                orderItem.upload_url12 !== "" &&
                                orderItem.upload_url12 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url12);
                              }
                              if (
                                orderItem.upload_url13 !== "" &&
                                orderItem.upload_url13 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url13);
                              }
                              if (
                                orderItem.upload_url14 !== "" &&
                                orderItem.upload_url14 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url14);
                              }
                              if (
                                orderItem.upload_url15 !== "" &&
                                orderItem.upload_url15 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url15);
                              }
                              if (
                                orderItem.upload_url16 !== "" &&
                                orderItem.upload_url16 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url16);
                              }
                              if (
                                orderItem.upload_url17 !== "" &&
                                orderItem.upload_url17 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url17);
                              }
                              if (
                                orderItem.upload_url18 !== "" &&
                                orderItem.upload_url18 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url18);
                              }
                              if (
                                orderItem.upload_url19 !== "" &&
                                orderItem.upload_url19 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url19);
                              }
                              if (
                                orderItem.upload_url20 !== "" &&
                                orderItem.upload_url20 !== null
                              ) {
                                uploadArray.push(orderItem.upload_url20);
                              }
                            }
                          })}
                          <tr className="borderBottom">
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              <b>Name:</b>
                            </td>
                            <td> {itemname}</td>
                          </tr>
                          <tr className="borderBottom">
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              <b>QTY:</b>
                            </td>
                            <td> {itemqty}</td>
                          </tr>
                          {item.product_options.map((product, index) => {
                            let display_name = product.display_name;
                            let display_value = product.display_value;
                            let new_display_name = display_name.slice(0, 10);
                            let reorder_display_name = display_name.slice(
                              0,
                              18
                            );
                            return (
                              <>
                                {new_display_name === "Sheet Size" ? (
                                  //if sheet size, cut off extra text
                                  <tr className="borderBottom">
                                    <td
                                      style={{
                                        marginLeft: "3%",
                                        padding: "10px",
                                        width: "25%",
                                      }}
                                    >
                                      <b>{new_display_name}:</b>
                                    </td>
                                    <td> {display_value}</td>
                                  </tr>
                                ) : display_name === "Transfer Count" ||
                                  new_display_name === "Supacolor " ? (
                                  <span></span>
                                ) : reorder_display_name ===
                                  "Is this a reorder?" ? (
                                  <tr className="borderBottom">
                                    <td
                                      style={{
                                        marginLeft: "3%",
                                        padding: "10px",
                                        width: "25%",
                                      }}
                                    >
                                      <b>{reorder_display_name}:</b>
                                    </td>
                                    <td> {display_value}</td>
                                  </tr>
                                ) : (
                                  <tr className="borderBottom">
                                    <td
                                      style={{
                                        marginLeft: "3%",
                                        padding: "10px",
                                        width: "25%",
                                      }}
                                    >
                                      <b>{display_name}:</b>
                                    </td>
                                    <td> {display_value}</td>
                                  </tr>
                                )}
                              </>
                            );
                          })}{" "}
                          <br />
                          <br />
                          <tr>
                            {" "}
                            <Button
                              variant="success"
                              onClick={(event) => {
                                event.preventDefault();
                                window.open(uploadArray[index]);
                              }}
                            >
                              Current Artwork
                            </Button>
                          </tr>
                        </>
                      );
                    }
                    return null;
                  })}{" "}
                </table>
                <table
                  style={{
                    marginLeft: "200px",
                    marginRight: "auto",
                    marginTop: "20px",
                    width: "80%",
                  }}
                >
                  <tr>
                    <td>
                      <b>Communication History:</b>
                    </td>
                  </tr>
                  {this.props.historylisttable.map((history, index) => {
                    let admincomments = history.admincomments;
                    let customercomments = history.customercomments;
                    let datetime = history.comment_made_at;
                    let order_number = history.order_number;
                    return (
                      <>
                        {typeof admincomments === "string" &&
                        order_number == this.state.order_number ? (
                          <tr className="borderBottom">
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              <b>Artist Comments:</b>
                            </td>
                            <td> {admincomments}</td>
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              {datetime}
                            </td>
                          </tr>
                        ) : (
                          <span></span>
                        )}
                        {typeof customercomments === "string" &&
                        order_number == this.state.order_number ? (
                          <tr className="borderBottom">
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              <b>Customer Comments:</b>
                            </td>
                            <td> {customercomments}</td>
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              {datetime}
                            </td>
                          </tr>
                        ) : (
                          <span></span>
                        )}
                      </>
                    );
                  })}{" "}
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
        <br />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  confirmlist: state.item.confirmlist,
  detailslist: state.item.detailslist,
  historylist: state.item.historylist,
  historylisttable: state.item.historylisttable,
});
export default connect(mapStateToProps)(SentCustomer);
