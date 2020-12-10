import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import MUITable from "../MUITable/MUITable";
import { Paper, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ViewListIcon from "@material-ui/icons/ViewList";
import { auto } from "async";
import swal from "sweetalert";
import RestoreIcon from "@material-ui/icons/Restore";

class Complete extends Component {
  state = {
    toggle: false,
    toggle2: false,
    toggle3: false,
    qty: "",
    updated_qty: "",
    id: "",
    sku: "",
    sku_description: "",
    qty: "",
    brand: "",
    dataSelector: [],
  };
  componentDidMount() {
    this.props.dispatch({
      type: "GET_COMPLETE_LIST",
    });
    this.props.dispatch({
      type: "GET_ITEM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_CUSTOM_ITEM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_PROGRESS_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_CONFIRM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_RESPOND_LIST_COUNT",
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

  toggle2 = () => {
    this.setState({
      toggle2: !this.state.toggle2,
    });
    this.props.dispatch({
      type: "GET_COMPLETE_LIST",
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
    let dataSelector = this.state.dataSelector;
    const data = this.props.completelist.map((complete) => [
      complete.order_number,
      complete.sku,
      complete.description,
      complete.product_length,
      complete.qty,
      complete.assigned,
      complete.created_at,
      complete.priority
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>Complete</h1>
        </center>

        <div style={{ padding: "1.5%" }}>
          {/* {this.state.toggle3 === false ? (
            <Button
              variant="primary"
              onClick={(event) => {
                event.preventDefault();
                let checkInput = document.getElementsByTagName("input");
                for (let index = 0; index < checkInput.length; index++) {
                  const element = checkInput[index];
                  console.log(element.checked);
                  element.checked = true;
                }
                this.props.completelist.map((item) => {
                  dataSelector.push(item);
                });
                this.setState({
                  toggle3: !this.state.toggle3,
                });
                console.log(dataSelector);
              }}
            >
              Select All
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={(event) => {
                event.preventDefault();
                let checkInput = document.getElementsByTagName("input");
                for (let index = 0; index < checkInput.length; index++) {
                  const element = checkInput[index];
                  console.log(element.checked);
                  element.checked = false;
                }
                dataSelector = [];
                this.setState({
                  toggle3: !this.state.toggle3,
                  dataSelector: [],
                });
                console.log(dataSelector);
              }}
            >
              Deselect All
            </Button>
          )} */}
          <Button
            variant="success"
            onClick={(event) => {
              event.preventDefault();
              console.log(dataSelector);

              for (let index = 0; index < dataSelector.length; index++) {
                const element = dataSelector[index];
                let decoSku = element.sku;
                console.log(element);
                let decoSku2 = decoSku.slice(0, 2);
                let decoSku3 = decoSku.slice(0, 6);
                let decoSku4 = decoSku.slice(0, 5);
                let decoSku5 = decoSku.slice(0, 3);
                let decoSku6 = decoSku.slice(0, 8);
                if (
                  decoSku5 === "CD1" ||
                  decoSku5 === "CD2" ||
                  decoSku5 === "CD3" ||
                  decoSku5 === "CD4" ||
                  decoSku5 === "CD5" ||
                  decoSku5 === "CD6" ||
                  decoSku5 === "CD7" ||
                  decoSku5 === "CD8" ||
                  decoSku5 === "CD9" ||
                  decoSku5 === "CS1" ||
                  decoSku5 === "CS2" ||
                  decoSku5 === "CS3" ||
                  decoSku5 === "CS4" ||
                  decoSku5 === "CS5" ||
                  decoSku5 === "CS6" ||
                  decoSku5 === "CS7" ||
                  decoSku5 === "CS8" ||
                  decoSku5 === "CS9" ||
                  decoSku5 === "SD1" ||
                  decoSku5 === "SD2" ||
                  decoSku5 === "SD3" ||
                  decoSku5 === "SD4" ||
                  decoSku5 === "SD5" ||
                  decoSku5 === "SD6" ||
                  decoSku5 === "SD7" ||
                  decoSku5 === "SD8" ||
                  decoSku5 === "SD9" ||
                  decoSku3 === "CUSTOM" ||
                  decoSku3 === "SUBKIT" ||
                  decoSku6 === "SETUPFEE" ||
                  decoSku3 === "SISER-" ||
                  decoSku5 === "SP-" ||
                  decoSku5 === "CP-"
                ) {
                  this.props.dispatch({
                    type: "START_ITEM",
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
                      priority: element.priority,
                    },
                  });
                  this.props.dispatch({
                    type: "DELETE_COMPLETE",
                    payload: element.id,
                  });
                } else {
                  console.log("skipping custom order");
                }
              }
              this.props.dispatch({
                type: "GET_PROGRESS_LIST",
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
              console.log("delete successful");
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
            <RestoreIcon></RestoreIcon>
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
                //end sweet alerts
              }).then((willDelete) => {
                // start .then
                //if confirmed, delete
                if (willDelete) {
                  for (let index = 0; index < dataSelector.length; index++) {
                    const element = dataSelector[index];
                    this.props.dispatch({
                      type: "DELETE_COMPLETE",
                      payload: element.id,
                    });
                  }
                  this.props.dispatch({
                    type: "GET_COMPLETE_LIST",
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
                  console.log("delete successful");
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
                  //...else cancel action
                  console.log("delete canceled");
                }
              });
            }}
          >
            <DeleteIcon></DeleteIcon>
          </Button>
          <MUITable
            data={data} //brings in data as an array, in this case, list of admins
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
                        style={{ cursor: "pointer"}}
                        name=""
                        value=""
                        onClick={(event) => {
                          let checkChecked = document.getElementById(dataIndex)
                            .checked;
                          console.log("checkChecked", checkChecked);
                          console.log("I'm being checked at index", dataIndex);
                          const itemArray = this.props.completelist;
                          const item = itemArray[dataIndex];
                          if (checkChecked === true) {
                            dataSelector.push(item);
                            console.log("dataSelector", dataSelector);
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
                          console.log(dataSelector);
                        }}
                      ></input>
                    );
                  },
                },
              },
              { name: "Order Number" },
              { name: "SKU" },
              { name: "Description" },
              { name: "Length" },
              { name: "QTY" },
              { name: "Assigned" },
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
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.completelist;
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
                name: "Go Back",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.completelist;
                          const item = itemArray[dataIndex];
                          let decoSku = item.sku;
                          let decoSku2 = decoSku.slice(0, 2);
                          let decoSku3 = decoSku.slice(0, 6);
                          let decoSku4 = decoSku.slice(0, 5);
                          let decoSku5 = decoSku.slice(0, 3);
                          let decoSku6 = decoSku.slice(0, 8);
                          if (
                            decoSku5 === "CD1" ||
                            decoSku5 === "CD2" ||
                            decoSku5 === "CD3" ||
                            decoSku5 === "CD4" ||
                            decoSku5 === "CD5" ||
                            decoSku5 === "CD6" ||
                            decoSku5 === "CD7" ||
                            decoSku5 === "CD8" ||
                            decoSku5 === "CD9" ||
                            decoSku5 === "CS1" ||
                            decoSku5 === "CS2" ||
                            decoSku5 === "CS3" ||
                            decoSku5 === "CS4" ||
                            decoSku5 === "CS5" ||
                            decoSku5 === "CS6" ||
                            decoSku5 === "CS7" ||
                            decoSku5 === "CS8" ||
                            decoSku5 === "CS9" ||
                            decoSku5 === "SD1" ||
                            decoSku5 === "SD2" ||
                            decoSku5 === "SD3" ||
                            decoSku5 === "SD4" ||
                            decoSku5 === "SD5" ||
                            decoSku5 === "SD6" ||
                            decoSku5 === "SD7" ||
                            decoSku5 === "SD8" ||
                            decoSku5 === "SD9" ||
                            decoSku3 === "CUSTOM" ||
                            decoSku3 === "SUBKIT" ||
                            decoSku6 === "SETUPFEE" ||
                            decoSku3 === "SISER-" ||
                            decoSku5 === "SP-" ||
                            decoSku5 === "CP-"
                          ) {
                            this.props.dispatch({
                              type: "START_ITEM",
                              payload: {
                                id: item.id,
                                email: item.email,
                                first_name: item.first_name,
                                last_name: item.last_name,
                                order_number: item.order_number,
                                sku: item.sku,
                                description: item.description,
                                product_length: item.product_length,
                                product_options: item.product_options,
                                qty: item.qty,
                                assigned: item.assigned,
                                created_at: item.created_at,
                                priority: item.priority,
                              },
                            });
                            this.props.dispatch({
                              type: "DELETE_COMPLETE",
                              payload: item.id,
                            });
                            this.props.dispatch({
                              type: "GET_PROGRESS_LIST",
                            });
                            this.props.dispatch({
                              type: "GET_COMPLETE_LIST",
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
                            swal("Sorry, we can't go back on a custom order");
                          }
                        }}
                      >
                        <RestoreIcon></RestoreIcon>
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
                          const itemArray = this.props.completelist;

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
                                type: "DELETE_COMPLETE",
                                payload: item.id,
                              });
                              this.props.dispatch({
                                type: "GET_COMPLETE_LIST",
                              });
                              this.props.dispatch({
                                type: "GET_ITEM_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_CONFIRM_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_RESPOND_LIST_COUNT",
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
                              console.log("this has been deleted");
                            } else {
                              //...else cancel action
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
            title={"Completed items"} //give the table a name
          />
        </div>
        <br />
        <br />
        <br />
        {this.state.toggle2 === false ? (
          //if toggle is false, render nothing. This is the default
          <span></span>
        ) : (
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
                  textAlign: "center",
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
                        <Button
                          onClick={this.toggle2}
                          variant="success"
                          type="submit"
                        >
                          Close
                        </Button>
                      </>
                    );
                  }
                })}{" "}
                <br />
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
  completelist: state.item.completelist,
  detailslist: state.item.detailslist,
});
export default connect(mapStateToProps)(Complete);
