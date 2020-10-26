import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import moment from "moment";
import MUITable from "../MUITable/MUITable";


class Progress extends Component {
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
      type: "GET_PROGRESS_LIST",
    });
  }

  render() {
    const data = this.props.progresslist.map((progress) => [
      progress.brand,
      progress.sku,
      progress.sku_description,
      progress.qty,
      moment.utc(progress.created_at).format("MMMM Do YYYY"),
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
              { name: "Category/Brand" },
              { name: "SKU" },
              { name: "SKU Description" },
              { name: "QTY" },
              { name: "Date" },
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
                          console.log(
                            `entry id should be: ${item.id} ${item.qty} ${item.sku_description} ${item.sku} ${item.brand}`
                          );
                          this.props.dispatch({
                            type: "MARK_COMPLETE",
                            payload: {
                              id: item.id,
                              sku: item.sku,
                              sku_description: item.sku_description,
                              qty: item.qty,
                              brand: item.brand,
                            },
                          });
                           this.props.dispatch({
                             type: "DELETE_PROGRESS",
                             payload: item.id,
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
