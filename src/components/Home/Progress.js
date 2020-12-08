import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import moment from "moment";
import MUITable from "../MUITable/MUITable";
import swal from "sweetalert";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DeleteIcon from "@material-ui/icons/Delete";


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
    qty: "",
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
      progress.product_length,
      progress.qty,
      progress.first_name,
      progress.last_name,
      progress.assigned,
      progress.created_at,
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>In Progress</h1>
        </center>
        <div style={{ padding: "1.5%" }}>
          {this.state.toggle3 === false ? (
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
                this.props.progresslist.map((item) => {
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
                });
                console.log(dataSelector);
              }}
            >
              Deselect All
            </Button>
          )}
          <Button
            variant="success"
            onClick={(event) => {
              event.preventDefault();
              console.log(dataSelector);
              swal({
                title: "Mark Complete?",
                text:
                  "Click 'ok' to mark the selected orders complete, this action can't be undone!",
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
                      type: "MARK_COMPLETE",
                      payload: {
                        id: element.id,
                        email: element.email,
                        first_name: element.first_name,
                        last_name: element.last_name,
                        order_number: element.order_number,
                        sku: element.sku,
                        product_length: element.product_length,
                        product_options: element.product_options,
                        qty: element.qty,
                        assigned: element.assigned,
                        created_at: element.created_at,
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
                  //success! review deleted
                  console.log("delete successful");
                  let checkInput = document.getElementsByTagName("input");
                  for (let index = 0; index < checkInput.length; index++) {
                    const element = checkInput[index];
                    console.log(element.checked);
                    element.checked = false;
                  }
                } else {
                  //...else cancel action
                  console.log("delete canceled");
                }
              });
            }}
          >
            Mark Selected Complete
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
                  //success! review deleted
                  console.log("delete successful");
                  let checkInput = document.getElementsByTagName("input");
                  for (let index = 0; index < checkInput.length; index++) {
                    const element = checkInput[index];
                    console.log(element.checked);
                    element.checked = false;
                  }
                } else {
                  //...else cancel action
                  console.log("delete canceled");
                }
              });
            }}
          >
            Delete Selected
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
                        name=""
                        value=""
                        onClick={(event) => {
                          let checkChecked = document.getElementById(dataIndex)
                            .checked;
                          console.log("checkChecked", checkChecked);
                          console.log("I'm being checked at index", dataIndex);
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
                          console.log(dataSelector);
                        }}
                      ></input>
                    );
                  },
                },
              },
              { name: "Order Number" },
              { name: "SKU" },
              { name: "Length" },
              { name: "QTY" },
              { name: "First Name" },
              { name: "Last Name" },
              { name: "Assigned" },
              { name: "Created At" },
              {
                name: "Mark Complete",
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
                          const itemArray = this.props.progresslist;
                          const item = itemArray[dataIndex];

                          swal({
                            title: "Mark Complete?",
                            text:
                              "This action can't be undone, click 'ok' to confirm!",
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
                              console.log("marked complete");
                            } else {
                              //...else cancel action
                              console.log("action canceled");
                            }
                          });
                        }}
                      >
                        <AssignmentTurnedInIcon></AssignmentTurnedInIcon>
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
                          const itemArray = this.props.progresslist;

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
                              //success! review deleted
                              console.log("deleted");
                            } else {
                              //...else cancel action
                              console.log("action canceled");
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
  progresslist: state.item.progresslist,
});
export default connect(mapStateToProps)(Progress);
