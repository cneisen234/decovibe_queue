import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import MUITable from "../MUITable/MUITable";
import { Paper, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { auto } from "async";
import swal from "sweetalert";

class Complete extends Component {
  state = {
    toggle: false,
    toggle2: false,
    qty: "",
    updated_qty: "",
    id: "",
    sku: "",
    sku_description: "",
    qty: "",
    brand: "",
  };
  componentDidMount() {
    this.props.dispatch({
      type: "GET_COMPLETE_LIST",
    });
        this.props.dispatch({
          type: "GET_ITEM_LIST_COUNT",
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

  render() {
    const data = this.props.completelist.map((complete) => [
      complete.order_number,
      complete.sku,
      complete.product_length,
      complete.qty,
      complete.first_name,
      complete.last_name,
      complete.assigned,
      complete.created_at,
    ]);
    return (
      <div>
        <br />
        <center>
          <Button
            variant="danger"
            style={{ float: "right" }}
            onClick={(event) => {
              event.preventDefault();
              swal({
                            title: "Warning!",
                            text:
                              "This will delete everything on the completed table",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                            //end sweet alerts
                          }).then((willDelete) => {
                            // start .then
                            //if confirmed, delete
                            if (willDelete) {
                              this.props.dispatch({
                                type: "DELETE_COMPLETE_ALL",
                              });
                              this.props.dispatch({
                                type: "GET_COMPLETE_LIST",
                              });
                              this.props.dispatch({
                                type: "GET_ITEM_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_PROGRESS_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_COMPLETE_LIST_COUNT",
                              });
                              //success! review deleted
                              swal(
                                "Completed table deleted!",
                                {
                                  icon: "success",
                                }
                              );
                            } else {
                              //...else cancel action
                              swal("The table is safe!");
                            }
                          });
            }}
          >
            Delete All
          </Button>
          <h1>Complete</h1>
        </center>

        <div style={{ padding: "1.5%" }}>
          <MUITable
            data={data} //brings in data as an array, in this case, list of admins
            columns={[
              //names the columns found on MUI table
              { name: "Order Number" },
              { name: "SKU" },
              { name: "Length" },
              { name: "QTY" },
              { name: "First Name" },
              { name: "Last Name" },
              { name: "Assigned" },
              { name: "Created At" },
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
                                type: "GET_PROGRESS_LIST_COUNT",
                              });
                              this.props.dispatch({
                                type: "GET_COMPLETE_LIST_COUNT",
                              });
                              //success! review deleted
                              swal(
                                "Poof! The sku on this order has been deleted!",
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
            title={"Completed items"} //give the table a name
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
  completelist: state.item.completelist,
});
export default connect(mapStateToProps)(Complete);
