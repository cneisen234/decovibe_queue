import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import MUITable from "../MUITable/MUITable";
import swal from "sweetalert";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DeleteIcon from "@material-ui/icons/Delete";
import RestoreIcon from "@material-ui/icons/Restore";
import FlagIcon from "@material-ui/icons/Flag";


class Progress extends Component {
  state = {
    toggle3: false,
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
    dataSelector: [],
  };
  componentDidMount() {
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

  render() {
    let dataSelector = this.state.dataSelector;
    const data = this.props.progresslist.map((progress) => [
      progress.order_number,
      progress.sku,
      progress.description,
      progress.product_length,
      progress.qty,
      progress.assigned,
      progress.created_at,
      progress.priority
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>In Progress</h1>
        </center>
        <div style={{ padding: "1.5%" }}>
           {this.props.user.role === "csr" ? (
                            <span></span>
                          ) : (
                            <>
          <Button
            variant="success"
            onClick={(event) => {
              event.preventDefault();
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
                    priority: element.priority,
                  },
                });
                this.props.dispatch({
                  type: "DELETE_PROGRESS",
                  payload: element.id,
                });
              }
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
            <AssignmentTurnedInIcon></AssignmentTurnedInIcon>
          </Button>
          <Button
            variant="success"
            onClick={(event) => {
              event.preventDefault();
              for (let index = 0; index < dataSelector.length; index++) {
                const element = dataSelector[index];
                this.props.dispatch({
                  type: "ADD_NEW",
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
                  type: "DELETE_PROGRESS",
                  payload: element.id,
                });
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
              let checkInput = document.getElementsByTagName("input");
              for (let index = 0; index < checkInput.length; index++) {
                const element = checkInput[index];
                console.log(element.checked);
                element.checked = false;
              }
              this.setState({
                dataSelector: [],
              });
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
              for (let index = 0; index < dataSelector.length; index++) {
                const element = dataSelector[index];
                this.props.dispatch({
                  type: "MARK_PRIORITY_PROGRESS",
                  payload: {
                    id: element.id,
                    priority: "high",
                  },
                });
              }
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
              console.log(dataSelector);
              for (let index = 0; index < dataSelector.length; index++) {
                const element = dataSelector[index];
                this.props.dispatch({
                  type: "MARK_PRIORITY_PROGRESS",
                  payload: {
                    id: element.id,
                    priority: "low",
                  },
                });
              }
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
                      type: "DELETE_PROGRESS",
                      payload: element.id,
                    });
                  }
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
</>
                          )}
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
                       this.props.user.role === "csr" ? (
                            <span></span>
                          ) : (
                      <input
                        type="checkbox"
                        id={dataIndex}
                        style={{ cursor: "pointer" }}
                        name=""
                        value=""
                        onClick={(event) => {
                          let checkChecked = document.getElementById(dataIndex)
                            .checked;
                          const itemArray = this.props.progresslist;
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
                          )
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
                name: "Mark Complete",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                        this.props.user.role === "csr" ? (
                            <span></span>
                          ) : (
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.progresslist;
                          const item = itemArray[dataIndex];
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
                              product_length: item.product_length,
                              product_options: item.product_options,
                              qty: item.qty,
                              assigned: item.assigned,
                              created_at: item.created_at,
                              priority: item.priority,
                            },
                          });
                          this.props.dispatch({
                            type: "DELETE_PROGRESS",
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
                name: "Go Back",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return (
                        this.props.user.role === "csr" ? (
                            <span></span>
                          ) : (
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.progresslist;
                          const item = itemArray[dataIndex];
                          this.props.dispatch({
                            type: "ADD_NEW",
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
                            type: "DELETE_PROGRESS",
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
                name: "Mark Priority",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return   this.props.user.role === "csr" ? (
                            <span></span>
                          ) : (
                    
                    this.props.progresslist[dataIndex] &&
                      this.props.progresslist[dataIndex].priority === "low" ? (
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.progresslist;
                          const item = itemArray[dataIndex];
                          this.props.dispatch({
                            type: "MARK_PRIORITY_PROGRESS",
                            payload: {
                              id: item.id,
                              priority: "high",
                            },
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
                        }}
                      >
                        <FlagIcon></FlagIcon>
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.progresslist;
                          const item = itemArray[dataIndex];
                          this.props.dispatch({
                            type: "MARK_PRIORITY_PROGRESS",
                            payload: {
                              id: item.id,
                              priority: "low",
                            },
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
                        }}
                      >
                        <FlagIcon></FlagIcon>
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
                    return (
                        this.props.user.role === "csr" ? (
                            <span></span>
                          ) : (
                      <Button
                        variant="danger"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.progresslist;
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
                                type: "DELETE_PROGRESS",
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
                        <DeleteIcon></DeleteIcon>
                      </Button>
                          )
                    );
                  },
                },
              },
            ]}
            title={"Items In Progress"} //give the table a name
          />
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
  progresslist: state.item.progresslist,
});
export default connect(mapStateToProps)(Progress);
