import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import MUITable from "../MUITable/MUITable";
import { Paper, TextField } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import DeleteIcon from "@material-ui/icons/Delete";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import FlagIcon from "@material-ui/icons/Flag";
import QueueIcon from "@material-ui/icons/Queue";
import swal from "sweetalert";
//import { response } from "express";

// This component is for new
class New extends Component {
  state = {
    toggle: false,
    toggle3: false,
    toggle4: false,
    toggle5: false,
    toggle6: false,
    need_to_run: "",
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
    //get all new stock items
    this.props.dispatch({
      type: "GET_ITEM_LIST",
    });
    this.props.dispatch({
      type: "GET_PROGRESS_LIST",
    });
    this.props.dispatch({
      type: "GET_CUSTOM_ITEM_LIST",
    });
    this.props.dispatch({
      type: "GET_CONFIRM_LIST",
    });
    this.props.dispatch({
      type: "GET_RESPOND_LIST",
    });
    this.props.dispatch({
      type: "GET_COMPLETE_LIST",
    });
    //get count of everything
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
    //delete from complete table and history table if dates meet cut off dates defined in the server
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
  //toggles edit window
  toggle = () => {
    this.setState({
      toggle: !this.state.toggle,
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
  };
  toggle2 = () => {
    this.setState({
      toggle2: !this.state.toggle2,
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
  };
  toggle4 = () => {
    this.setState({
      toggle4: !this.state.toggle4,
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
  };

  toggle5 = () => {
    this.setState({
      toggle5: !this.state.toggle5,
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
  };
  toggle6 = () => {
    this.setState({
      toggle6: !this.state.toggle6,
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
  };
  assignTask = (event) => {
    //assigns the task to a decovibe worker
    event.preventDefault();
    const { id, assigned } = this.state;
    this.props.dispatch({
      type: "ASSIGN_TASK",
      payload: {
        id: id,
        assigned: assigned,
      },
    });
    this.setState({
      toggle: false,
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
  };
  needToRun = (event) => {
    //assigns the task to a decovibe worker
    event.preventDefault();
    const { id, need_to_run } = this.state;
    this.props.dispatch({
      type: "NEED_TO_RUN",
      payload: {
        id: id,
        need_to_run: need_to_run,
      },
    });
    this.setState({
      toggle5: false,
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
  };

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    //defines the dataselector to know which items to preform actions on
    let dataSelector = this.state.dataSelector;
    let decoSku3 = "";
    let decoSku5 = "";
    let decoSku7 = "";
    let decoSku6 = "";
    let descrip = "";
    const data = this.props.itemlist.map((item) => [
      item.order_number,
      item.sku,
      item.description,
      item.product_length,
      item.qty,
      item.need_to_run,
      item.assigned,
      item.created_at,
      item.priority,
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>New</h1>
        </center>
        <div className="navbuttonscontainer"></div>
        <div style={{ padding: "1.5%" }}>
          {this.props.user.role === "csr" ? (
            <span></span>
          ) : (
            <div className="multiButtons">
              <Button
                variant="success"
                onClick={(event) => {
                  this.setState({
                    toggle4: !this.state.toggle4,
                    toggle3: false,
                  });
                }}
              >
                <AssignmentIndIcon></AssignmentIndIcon>
              </Button>
              <Button
                variant="success"
                onClick={(event) => {
                  this.setState({
                    toggle6: !this.state.toggle6,
                    toggle3: false,
                  });
                }}
              >
                <QueueIcon></QueueIcon>
              </Button>
              <Button
                variant="success"
                onClick={(event) => {
                  event.preventDefault();
                  console.log(dataSelector);
                  for (let index = 0; index < dataSelector.length; index++) {
                    //loop through the dataselector to know which indexes are checked, preform action on those indexes
                    const element = dataSelector[index];
                    this.props.dispatch({
                      type: "START_ITEM",
                      payload: {
                        id: element.id,
                        email: element.email,
                        first_name: element.first_name,
                        last_name: element.last_name,
                        order_number: element.order_number,
                        description: element.description,
                        sku: element.sku,
                        product_length: element.product_length,
                        product_options: element.product_options,
                        qty: element.qty,
                        assigned: element.assigned,
                        created_at: element.created_at,
                        priority: element.priority,
                      },
                    });
                    this.props.dispatch({
                      type: "DELETE_ITEM",
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
                  //uncheck all inputs
                  let checkInput = document.getElementsByTagName("input");
                  for (let index = 0; index < checkInput.length; index++) {
                    const element = checkInput[index];
                    element.checked = false;
                  }
                  //...and clear the dataselector
                  dataSelector = [];
                  this.setState({
                    dataSelector: [],
                    toggle3: false,
                  });
                }}
              >
                <PlayArrowIcon></PlayArrowIcon>
              </Button>
              {/* mark the selected items complete */}
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
                      type: "DELETE_ITEM",
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
                }}
              >
                <AssignmentTurnedInIcon></AssignmentTurnedInIcon>
              </Button>
              {/* mark selected items high priority */}
              <Button
                variant="danger"
                onClick={(event) => {
                  event.preventDefault();
                  for (let index = 0; index < dataSelector.length; index++) {
                    const element = dataSelector[index];
                    this.props.dispatch({
                      type: "MARK_PRIORITY",
                      payload: {
                        id: element.id,
                        priority: "high",
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
                }}
              >
                <FlagIcon></FlagIcon>
              </Button>
              {/* mark selected items low priority */}
              <Button
                variant="success"
                onClick={(event) => {
                  event.preventDefault();
                  console.log(dataSelector);
                  for (let index = 0; index < dataSelector.length; index++) {
                    const element = dataSelector[index];
                    this.props.dispatch({
                      type: "MARK_PRIORITY",
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
                }}
              >
                <FlagIcon></FlagIcon>
              </Button>
              {/* deleted selected items */}
              <Button
                variant="danger"
                onClick={(event) => {
                  event.preventDefault();
                  //sweet alerts to warn of irreversible action
                  swal({
                    title: "Are you sure?",
                    text:
                      "Once deleted, you will not be able to recover the sku on these orders!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                  }).then((willDelete) => {
                    if (willDelete) {
                      for (
                        let index = 0;
                        index < dataSelector.length;
                        index++
                      ) {
                        const element = dataSelector[index];
                        this.props.dispatch({
                          type: "DELETE_ITEM",
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
          <br />
          <br />
          <br />
          <MUITable
            data={data} //brings in data as an array, in this case, list of items
            columns={[
              //names the columns found on MUI table
              //col with the checkboxes
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
                          //if clicked, check the checkbox
                          let checkChecked = document.getElementById(dataIndex)
                            .checked;
                          const itemArray = this.props.itemlist;
                          const item = itemArray[dataIndex];
                          if (checkChecked === true) {
                            //...and push the index into the dataselector
                            dataSelector.push(item);
                          } else {
                            //when deselected, remove the index from the dataselector
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
              {
                name: "Number to Run",
                options: {
                  filter: true,
                  sort: true,
                  // empty: true,
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#BE93D4",
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        {value}
                      </div>
                    );
                  },
                },
              },
              { name: "Assigned" },
              { name: "Created At" },
              { name: "Priority" },
              {
                name: "Need To Run",
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
                          const itemArray = this.props.itemlist;
                          const item = itemArray[dataIndex];
                          this.setState({
                            toggle5: !this.state.toggle5,
                            id: item.id,
                          });
                        }}
                      >
                        <QueueIcon></QueueIcon>
                      </Button>
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
                          const itemArray = this.props.itemlist;
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
                name: "Start",
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
                          const itemArray = this.props.itemlist;
                          const item = itemArray[dataIndex];
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
                            type: "DELETE_ITEM",
                            payload: item.id,
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
                        }}
                      >
                        <PlayArrowIcon></PlayArrowIcon>
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
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.itemlist;
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
                            type: "DELETE_ITEM",
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
                        }}
                      >
                        <AssignmentTurnedInIcon></AssignmentTurnedInIcon>
                      </Button>
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
                    return this.props.user.role === "csr" ? (
                      <span></span>
                    ) : this.props.itemlist[dataIndex] &&
                      this.props.itemlist[dataIndex].priority === "low" ? (
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.itemlist;
                          const item = itemArray[dataIndex];

                          this.props.dispatch({
                            type: "MARK_PRIORITY",
                            payload: {
                              id: item.id,
                              priority: "high",
                            },
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
                        }}
                      >
                        <FlagIcon></FlagIcon>
                      </Button>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.itemlist;
                          const item = itemArray[dataIndex];

                          this.props.dispatch({
                            type: "MARK_PRIORITY",
                            payload: {
                              id: item.id,
                              priority: "low",
                            },
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
                    return this.props.user.role === "csr" ? (
                      <span></span>
                    ) : (
                      <Button
                        variant="danger"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.itemlist;

                          const item = itemArray[dataIndex];
                          //sweetalerts to warn of irreversable action
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
                                type: "DELETE_ITEM",
                                payload: item.id,
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
            title={"New Items"} //give the table a name
          />
          {this.state.toggle === false ? (
            //if toggle is false, render nothing. This is the default
            <span></span>
          ) : (
            //else render the assign window
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
                  {/* onClick tied to form element, runs submitInfo on click */}
                  <Button variant="success" type="submit">
                    Assign
                  </Button>
                </form>
                {/* toggles edit window back to not displaying */}
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

          {this.state.toggle4 === false ? (
            //if toggle is false, render nothing. This is the default
            <span></span>
          ) : (
            //another assign window for the selected checkboxes. Needed it's own window because the functionality needed to be altered a bit for this feature
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
                <form
                  onSubmit={(event) => {
                    //prevents default action
                    event.preventDefault();
                    const { assigned } = this.state;
                    for (let index = 0; index < dataSelector.length; index++) {
                      const element = dataSelector[index];
                      this.props.dispatch({
                        type: "ASSIGN_TASK",
                        payload: {
                          id: element.id,
                          assigned: assigned,
                        },
                      });
                      this.setState({
                        toggle4: false,
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
                    }
                    let checkInput = document.getElementsByTagName("input");
                    for (let index = 0; index < checkInput.length; index++) {
                      const element = checkInput[index];
                      console.log(element.checked);
                      element.checked = false;
                    }
                    dataSelector = [];
                    this.setState({
                      dataSelector: [],
                    });
                  }}
                >
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
                  {/* onClick tied to form element, runs submitInfo on click */}
                  <Button variant="success" type="submit">
                    Assign
                  </Button>
                </form>
                {/* toggles edit window back to not displaying */}
                <br />
                <br />
                <br />
                <br />
                <br />
                <Button onClick={this.toggle4} variant="success" type="submit">
                  Go Back
                </Button>
              </td>
            </Paper>
          )}

          {this.state.toggle5 === false ? (
            //if toggle is false, render nothing. This is the default
            <span></span>
          ) : (
            //else render the assign window
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
                <form onSubmit={this.needToRun}>
                  <TextField
                    style={{
                      width: "150%",
                    }}
                    variant="outlined"
                    label="Enter amount to run"
                    name="edit"
                    placeholder="...enter number"
                    // value of local state as text value
                    value={this.state.need_to_run}
                    type="text"
                    maxLength={10}
                    //runs handleChange on input change
                    onChange={(event) =>
                      this.handleChange(event, "need_to_run")
                    }
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  {/* onClick tied to form element, runs submitInfo on click */}
                  <Button variant="success" type="submit">
                    Set Amount
                  </Button>
                </form>
                {/* toggles edit window back to not displaying */}
                <br />
                <br />
                <br />
                <br />
                <br />
                <Button onClick={this.toggle5} variant="success" type="submit">
                  Go Back
                </Button>
              </td>
            </Paper>
          )}
          {this.state.toggle6 === false ? (
            //if toggle is false, render nothing. This is the default
            <span></span>
          ) : (
            //another assign window for the selected checkboxes. Needed it's own window because the functionality needed to be altered a bit for this feature
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
                <form
                  onSubmit={(event) => {
                    //prevents default action
                    event.preventDefault();
                    const { need_to_run } = this.state;
                    for (let index = 0; index < dataSelector.length; index++) {
                      const element = dataSelector[index];
                      this.props.dispatch({
                        type: "NEED_TO_RUN",
                        payload: {
                          id: element.id,
                          need_to_run: need_to_run,
                        },
                      });
                      this.setState({
                        toggle6: false,
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
                    }
                    let checkInput = document.getElementsByTagName("input");
                    for (let index = 0; index < checkInput.length; index++) {
                      const element = checkInput[index];
                      console.log(element.checked);
                      element.checked = false;
                    }
                    dataSelector = [];
                    this.setState({
                      dataSelector: [],
                    });
                  }}
                >
                  <TextField
                    style={{
                      width: "150%",
                    }}
                    variant="outlined"
                    label="Enter amount to run"
                    name="edit"
                    placeholder="...enter number"
                    // value of local state as text value
                    value={this.state.need_to_run}
                    type="text"
                    maxLength={10}
                    //runs handleChange on input change
                    onChange={(event) =>
                      this.handleChange(event, "need_to_run")
                    }
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  {/* onClick tied to form element, runs submitInfo on click */}
                  <Button variant="success" type="submit">
                    Set Amount
                  </Button>
                </form>
                {/* toggles edit window back to not displaying */}
                <br />
                <br />
                <br />
                <br />
                <br />
                <Button onClick={this.toggle6} variant="success" type="submit">
                  Go Back
                </Button>
              </td>
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
  itemlist: state.item.itemlist,
});
export default connect(mapStateToProps)(New);
