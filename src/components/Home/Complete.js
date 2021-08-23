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
    let decoSku3 = "";
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
                    decoSku3 = value.slice(0, 6);
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
                    } else if (
                      decoSku3 === "SUBPAT"
                    ) {
                      return (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#7AD7F0",
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
