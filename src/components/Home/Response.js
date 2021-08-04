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
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
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
    item_type: "",
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
      respond.first_name,
      respond.last_name,
      respond.item_type,
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
          {this.props.user.role === "csr" ? (
            <span></span>
          ) : (
            <div className="multiButtons">
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
                      for (
                        let index = 0;
                        index < dataSelector.length;
                        index++
                      ) {
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
              { name: "First Name" },
              { name: "Last Name" },
              { name: "Item Type" },
              { name: "Approved" },
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
                            const priority = item.priority;
                            const description = item.description;
                            const item_type = item.item_type;
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
                              payment_link: null,
                              priority: priority,
                              description: description,
                              item_type: item_type,
                            });
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
                      )
                    );
                  },
                },
              },
              // {
              //   name: "Send to SupaColor",
              //   options: {
              //     filter: false,
              //     sort: false,
              //     empty: true,
              //     customBodyRenderLite: (dataIndex, rowIndex) => {
              //       let sku = this.props.respondlist[dataIndex] && this.props.respondlist[dataIndex].sku
              //       let newSku = sku.slice(0, 5)
              //       return (newSku === "BL_A3" ||
              //         newSku === "BL_A4" ||
              //         newSku === "BL_A5" ||
              //         newSku === "BL_LC" ||
              //         newSku === "BL_SM" ||
              //         newSku === "HW_CA" ||
              //         newSku === "PR_BA" ||
              //         newSku === "PR_UM" ||
              //         newSku === "SB_A5" ||
              //         newSku === "SB_A4" ||
              //         newSku === "SB_A3" ||
              //         newSku === "SB_LC" ||
              //         newSku === "SB_SM" ||
              //         newSku === "SB_LS" ||
              //         newSku === "WE_SM" ||
              //         newSku === "WE_LC" ||
              //         newSku === "WE_A5" ||
              //         newSku === "WE_A4" ||
              //         newSku === "WE_A3") && this.props.respondlist[dataIndex] && this.props.respondlist[dataIndex].approve === "Yes" &&
              //         this.props.user.role !== "csr" ? (
              //         <Button
              //           variant="primary"
              //           onClick={(event) => {
              //             event.preventDefault();
              //             const itemArray = this.props.respondlist;
              //             const item = itemArray[dataIndex];
              //             this.props.dispatch({
              //               type: "SEND_SUPACOLOR",
              //               payload: {
              //                 id: item.id,
              //                 email: item.email,
              //                 first_name: item.first_name,
              //                 last_name: item.last_name,
              //                 order_number: item.order_number,
              //                 sku: item.sku,
              //                 description: item.description,
              //                 qty: item.qty,
              //                 assigned: item.assigned,
              //                 created_at: item.created_at,
              //               },
              //             });
              //             this.props.dispatch({
              //               type: "GET_PROGRESS_LIST",
              //             });
              //             this.props.dispatch({
              //               type: "GET_ITEM_LIST_COUNT",
              //             });
              //             this.props.dispatch({
              //               type: "GET_RESPOND_LIST_COUNT",
              //             });
              //             this.props.dispatch({
              //               type: "GET_CONFIRM_LIST_COUNT",
              //             });
              //             this.props.dispatch({
              //               type: "GET_CUSTOM_ITEM_LIST_COUNT",
              //             });
              //             this.props.dispatch({
              //               type: "GET_PROGRESS_LIST_COUNT",
              //             });
              //             this.props.dispatch({
              //               type: "GET_COMPLETE_LIST_COUNT",
              //             });
              //           }}
              //         >
              //           <ForwardIcon></ForwardIcon>
              //         </Button>
              //       ) : (
              //         <span></span>
              //       );
              //     },
              //   },
              // },
              // {
              //   name: "Artwork",
              //   options: {
              //     filter: false,
              //     sort: false,
              //     empty: true,
              //     customBodyRenderLite: (dataIndex, rowIndex) => {
              //       return this.props.respondlist[dataIndex] &&
              //         this.props.respondlist[dataIndex].upload_url !== null ? (
              //         <Button
              //           variant="success"
              //           onClick={(event) => {
              //             event.preventDefault();
              //             const itemArray = this.props.respondlist;
              //             const item = itemArray[dataIndex];
              //             window.open(item.upload_url);
              //           }}
              //         >
              //           <CloudDownloadIcon></CloudDownloadIcon>
              //         </Button>
              //       ) : (
              //         <span></span>
              //       );
              //     },
              //   },
              // },
              {
                name: "Mark Priority",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    return this.props.user.role === "csr" ? (
                      <span></span>
                    ) : this.props.respondlist[dataIndex] &&
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
                  let newIndex = index + 1;
                  //define pic as pic and concatnate the index number, this should match with state
                  let pic = "pic" + newIndex;
                  let filename = "filename" + newIndex;
                  let order_id = item.order_id;
                  let itemname = item.name;
                  let itemsku = item.sku;
                  let itemqty = item.quantity;
                  let decoSku = itemsku;
                  let decoSku3 = decoSku.slice(0, 6);
                  let decoSku4 = decoSku.slice(0, 5);
                  let decoSku7 = decoSku.slice(0, 7);
                  let decoSku6 = decoSku.slice(0, 8);
                  let uploadArray = [];
                  let currentOrder = "";
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
                        {this.props.respondlist.map((orderItem) => {
                          order_id = String(order_id);
                          if (orderItem.order_number === order_id) {
                            currentOrder = orderItem;
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
                          <td> {itemname} </td>
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
                        <br />
                        <br />
                        {this.props.user.role === "csr" ? (
                          <span></span>
                        ) : (
                          <>
                            <tr>
                              <td colspan={2}>
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
                          </>
                        )}
                        {this.state[pic] !== "" ||
                        this.props.user.role === "csr" ? (
                          <>
                            <tr>
                              <td colspan={2}>
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
                              <td colspan={2}>
                                <img
                                  src={this.state[pic]}
                                  alt="Upload File"
                                  height="200"
                                ></img>
                              </td>
                            </tr>
                          </>
                        ) : (
                          <span></span>
                        )}
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
                      </>
                    );
                  }
                  return null;
                })}{" "}
                <br />
                <br />
                {this.props.user.role === "csr" ? (
                  <span></span>
                ) : (
                  <>
                    <tr>
                      <td colspan={2}>
                        {""}
                        <TextField
                          style={{
                            width: "100%",
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
                          onChange={(event) =>
                            this.handleChange(event, "email")
                          }
                        />
                      </td>
                    </tr>
                    <br />
                    <br />
                    <tr>
                      <td colspan={2}>
                        {" "}
                        <TextField
                          style={{
                            width: "100%",
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
                      <td colspan={2}>
                        <Form.Control
                          as="select"
                          onChange={(event) =>
                            this.setState({
                              comments: event.target.value,
                              canned_edit: event.target.value,
                            })
                          }
                          style={{
                            width: "100%",
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
                      <td colspan={2}>
                        <TextField
                          style={{
                            width: "100%",
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
                      <td colspan={2}>
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
                            let canned_edit = this.state.canned_edit;
                            if (
                              canned_edit.slice(canned_edit.length - 1) === "?"
                            ) {
                              canned_edit = canned_edit.slice(
                                0,
                                canned_edit.length - 1
                              );
                              canned_edit = canned_edit + "1";
                            }
                            console.log(canned_edit);
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
                      <td colspan={2}>
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
                                description: this.state.description,
                                qty: this.state.qty,
                                assigned: this.state.assigned,
                                created_at: this.state.created_at,
                                priority: this.state.priority,
                                payment_link: this.state.payment_link,
                                item_type: this.state.item_type,
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
                            this.setState({
                              toggle2: !this.state.toggle2,
                              comments: "",
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
                            });
                          }}
                        >
                          Send to Customer
                        </Button>
                      </td>
                    </tr>
                    <br />
                    <br />
                  </>
                )}
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
  user: state.user,
  customitemlist: state.item.customitemlist,
  respondlist: state.item.respondlist,
  detailslist: state.item.detailslist,
  replieslist: state.item.replieslist,
  historylist: state.item.historylist,
  historylisttable: state.item.historylisttable,
});
export default connect(mapStateToProps)(Response);
