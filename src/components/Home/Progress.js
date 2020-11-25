import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import moment from "moment";
import MUITable from "../MUITable/MUITable";


class Progress extends Component {
  state = {
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
  };
  componentDidMount() {
    this.props.dispatch({
      type: "GET_PROGRESS_LIST",
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
  }

  render() {
    const data = this.props.progresslist.map((progress) => [
      progress.email,
      progress.first_name,
      progress.last_name,
      progress.order_number,
      progress.sku,
      progress.product_length,
      progress.product_options,
      progress.qty,
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
          <MUITable
            data={data}
            columns={[
              //names the columns found on MUI table
              { name: "Email" },
              { name: "First Name" },
              { name: "Last Name" },
              { name: "Order Number" },
              { name: "SKU" },
              { name: "Length" },
              { name: "Other Product Options" },
              { name: "QTY" },
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
                            type: "GET_ITEM_LIST_COUNT",
                          });
                          this.props.dispatch({
                            type: "GET_PROGRESS_LIST_COUNT",
                          });
                          this.props.dispatch({
                            type: "GET_COMPLETE_LIST_COUNT",
                          });
                        }}
                      >
                        Mark Complete
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

                          this.props.dispatch({
                            type: "DELETE_PROGRESS",
                            payload: item.id,
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
                        }}
                      >
                        Delete
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
