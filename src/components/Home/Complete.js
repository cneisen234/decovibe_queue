import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import MUITable from "../MUITable/MUITable";
import { Paper } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ViewListIcon from "@material-ui/icons/ViewList";
import swal from "sweetalert";
import RestoreIcon from "@material-ui/icons/Restore";

class Complete extends Component {
  state = {
    toggle: false,
    toggle2: false,
    toggle3: false,
    order_number: "",
    qty: "",
    updated_qty: "",
    id: "",
    sku: "",
    sku_description: "",
    brand: "",
    dataSelector: [],
  };
  componentDidMount() {
    //get the complete queue
    this.props.dispatch({
      type: "GET_COMPLETE_LIST",
    });
    //get the count of everything
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
      type: "GET_APPROVE_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_COMPLETE_LIST_COUNT",
    });
    //delete anything that meets the cut off dates defined on the backend
    this.props.dispatch({
      type: "DELETE_COMPLETE_RANGE",
    });
    this.props.dispatch({
      type: "DELETE_HISTORY_RANGE",
    });
  }
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
      type: "GET_COMPLETE_LIST",
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
    let dataSelector = this.state.dataSelector;
    let decoSku5 = "";
    let decoSku7 = "";
    let decoSku6 = "";
    let descrip = "";
    const data = this.props.completelist.map((complete) => [
      complete.order_number,
      complete.sku,
      complete.description,
      complete.product_length,
      complete.qty,
      complete.assigned,
      complete.created_at,
      complete.priority,
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>Complete</h1>
        </center>

        <div style={{ padding: "1.5%" }}>
          {this.props.user.role === "csr" ? (
            <span></span>
          ) : (
            <div className="multiButtons">
              {/*function to go back to in process for any selected skus*/}
              <Button
                variant="success"
                onClick={(event) => {
                  event.preventDefault();
                  console.log(dataSelector);

                  for (let index = 0; index < dataSelector.length; index++) {
                    const element = dataSelector[index];
                    let decoSku = element.sku;
                    //slice the skus to check only certain parts of them
                    let decoSku3 = decoSku.slice(0, 6);
                    let decoSku5 = decoSku.slice(0, 3);
                    let decoSku6 = decoSku.slice(0, 8);
                    if (
                      //if the sliced skus meet the below conditions
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
                      //...then allows the item to go back to process, it's a stock item
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
                      //...ignore any custom skus
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
                  //uncheck all of the checkboxes
                  let checkInput = document.getElementsByTagName("input");
                  for (let index = 0; index < checkInput.length; index++) {
                    const element = checkInput[index];
                    console.log(element.checked);
                    element.checked = false;
                  }
                  //empty data selector because nothing is checked
                  dataSelector = [];
                  this.setState({
                    dataSelector: [],
                    toggle3: false,
                  });
                }}
              >
                <RestoreIcon></RestoreIcon>
              </Button>
              {/* button to delete selected items */}
              <Button
                variant="danger"
                onClick={(event) => {
                  event.preventDefault();
                  //sweet alerts, this actions can't be undone
                  swal({
                    title: "Are you sure?",
                    text:
                      "Once deleted, you will not be able to recover the sku on these orders!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  }).then((willDelete) => {
                    if (willDelete) {
                      //loops through all selected items and deletes them
                      for (
                        let index = 0;
                        index < dataSelector.length;
                        index++
                      ) {
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
            </div>
          )}
          {/* start table */}
          <br />
          <br />
          <br />
          <MUITable
            data={data} //brings in data as an array, in this case, list of admins
            columns={[
              //names the columns found on MUI table
              //The col that shows the checkboxes
              {
                name: "Select",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return this.props.user.role === "csr" ? (
                      <span></span>
                    ) : (
                      <input
                        type="checkbox"
                        id={dataIndex}
                        style={{ cursor: "pointer", width: 50, height: 50 }}
                        name=""
                        value=""
                        onClick={(event) => {
                          //check the box and push into the dataselector array
                          let checkChecked = document.getElementById(dataIndex)
                            .checked;
                          const itemArray = this.props.completelist;
                          const item = itemArray[dataIndex];
                          if (checkChecked === true) {
                            //push the checked item into the dataselector array for later looping upon action
                            dataSelector.push(item);
                          } else {
                            //...uncheck the box and remove from dataselector array
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
              {
                name: "SKU",
                options: {
                  filter: true,
                  sort: true,
                  // empty: true,
                  customBodyRender: (value, tableMeta, updateValue) => {
                    decoSku5 = value.slice(0, 3);
                    decoSku7 = value.slice(0, 7);
                    decoSku6 = value.slice(0, 8);
                    if (
                      decoSku5 === "SD1" ||
                      decoSku5 === "SD2" ||
                      decoSku5 === "SD3" ||
                      decoSku5 === "SD4" ||
                      decoSku5 === "SD5" ||
                      decoSku5 === "SD6" ||
                      decoSku5 === "SD7" ||
                      decoSku5 === "SD8" ||
                      decoSku5 === "SD9" ||
                      decoSku6 === "SETUPFEE"
                    ) {
                      return (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#F7B665",
                            color: "black",
                          }}
                        >
                          {value}
                        </div>
                      );
                    } else if (
                      decoSku5 === "CS1" ||
                      decoSku5 === "CS2" ||
                      decoSku5 === "CS3" ||
                      decoSku5 === "CS4" ||
                      decoSku5 === "CS5" ||
                      decoSku5 === "CS6" ||
                      decoSku5 === "CS7" ||
                      decoSku5 === "CS8" ||
                      decoSku5 === "CS9"
                    ) {
                      return (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#90CA6D",
                            color: "black",
                          }}
                        >
                          {value}
                        </div>
                      );
                    } else if (
                      decoSku7 === "SISER-1" ||
                      decoSku7 === "SISER-2" ||
                      decoSku7 === "SISER-3" ||
                      decoSku7 === "SISER-4" ||
                      decoSku7 === "SISER-5" ||
                      decoSku7 === "SISER-6" ||
                      decoSku7 === "SISER-7" ||
                      decoSku7 === "SISER-8" ||
                      decoSku7 === "SISER-9"
                    ) {
                      return (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#F8F18A",
                            color: "black",
                          }}
                        >
                          {value}
                        </div>
                      );
                    } else if (
                      decoSku5 === "CD1" ||
                      decoSku5 === "CD2" ||
                      decoSku5 === "CD3" ||
                      decoSku5 === "CD4" ||
                      decoSku5 === "CD5" ||
                      decoSku5 === "CD6" ||
                      decoSku5 === "CD7" ||
                      decoSku5 === "CD8" ||
                      decoSku5 === "CD9"
                    ) {
                      return (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#EEB7D2",
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
              {
                name: "Description",
                options: {
                  filter: true,
                  sort: true,
                  // empty: true,
                  customBodyRender: (value, tableMeta, updateValue) => {
                    descrip = value.slice(value.length - 4);
                    if (descrip === "Pack" || descrip === "pack") {
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
                    } else {
                      return <div>{value}</div>;
                    }
                  },
                },
              },
              { name: "Length" },
              { name: "QTY" },
              { name: "Assigned" },
              { name: "Created At" },
              { name: "Priority" },
              //see order details
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
                          this.setState({
                            //toggles state to toggle the window
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
                          //runs the api call, sends the order number as payload to grab the correct order
                          this.props.dispatch({
                            type: "ORDER_DETAILS",
                            payload: {
                              order_number: order_number,
                            },
                          });
                          setTimeout(() => {
                            this.checkHistory();
                          }, 2000);
                        }}
                      >
                        <ViewListIcon></ViewListIcon>
                      </Button>
                    );
                  },
                },
              },
              //pushes the item back to the previous queue
              {
                name: "Go Back",
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
                          const itemArray = this.props.completelist;
                          const item = itemArray[dataIndex];
                          let decoSku = item.sku;
                          //slices sku up to check only certain parts
                          let decoSku3 = decoSku.slice(0, 6);
                          let decoSku5 = decoSku.slice(0, 3);
                          let decoSku6 = decoSku.slice(0, 8);
                          if (
                            //if the conditions below are met
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
                            //push the item back, it's a stock sku
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
                            //...else deny the action, can't push back a custom sku
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

              // deletes the sku
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
                          const itemArray = this.props.completelist;
                          const item = itemArray[dataIndex];
                          //sweet alerts, warn of irreversable action
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
                                type: "GET_APPROVE_LIST_COUNT",
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
            title={"Completed items"} //give the table a name
          />
          {/* end table */}
        </div>
        <br />
        <br />
        <br />
        {this.state.toggle2 === false ? (
          //details window, this toggles based on the boolean value of state.toggle2
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
                    {/* used to close the window, toggles back */}
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
                  //map from details reducer to show details pulled from api request from BigCommerce
                  let itemname = item.name;
                  let order_id = item.order_id;
                  let itemsku = item.sku;
                  let itemqty = item.quantity;
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
                        {this.props.completelist.map((orderItem) => {
                          order_id = String(order_id);
                          if (orderItem.order_number === order_id) {
                            uploadArray = [
                              orderItem.upload_url1,
                              orderItem.upload_url2,
                              orderItem.upload_url3,
                              orderItem.upload_url4,
                              orderItem.upload_url5,
                              orderItem.upload_url6,
                              orderItem.upload_url7,
                              orderItem.upload_url8,
                              orderItem.upload_url9,
                              orderItem.upload_url10,
                              orderItem.upload_url11,
                              orderItem.upload_url12,
                              orderItem.upload_url13,
                              orderItem.upload_url14,
                              orderItem.upload_url15,
                              orderItem.upload_url16,
                              orderItem.upload_url17,
                              orderItem.upload_url18,
                              orderItem.upload_url19,
                              orderItem.upload_url20,
                            ];
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
                          //map the product options of that sku to show the details
                          let display_name = product.display_name;
                          let display_value = product.display_value;
                          let new_display_name = display_name.slice(0, 10);
                          let reorder_display_name = display_name.slice(0, 18);
                          return (
                            <>
                              {new_display_name === "Sheet Size" ? (
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
                        {uploadArray[index] === null ||
                        uploadArray[index] === "" ? (
                          <span></span>
                        ) : (
                          <tr>
                            {" "}
                            <Button
                              variant="success"
                              onClick={(event) => {
                                event.preventDefault();
                                window.open(uploadArray[index]);
                              }}
                            >
                              Previous Artwork
                            </Button>
                          </tr>
                        )}
                        <br />
                        <br />
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
                      order_number === this.state.order_number ? (
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
                      order_number === this.state.order_number ? (
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
                <Button onClick={this.toggle2} variant="success" type="submit">
                  Close
                </Button>
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
//bring in complete table and order details from BigCommerce API
const mapStateToProps = (state) => ({
  user: state.user,
  completelist: state.item.completelist,
  detailslist: state.item.detailslist,
  historylist: state.item.historylist,
  historylisttable: state.item.historylisttable,
});
export default connect(mapStateToProps)(Complete);
