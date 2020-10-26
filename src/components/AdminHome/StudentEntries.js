import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import MUITable from "../MUITable/MUITable";
import { Paper, TextField } from "@material-ui/core";
import { auto } from "async";


class StudentEntries extends Component {
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
  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value }); //sets to value of targeted event
  }; //end handleChange
  //toggles edit window
  toggle = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  };
  toggle2 = () => {
    this.setState({
      toggle2: !this.state.toggle2,
    });
  };
  editItem = (event) => {
    //prevents default action
    event.preventDefault();
    const { qty, item } = this.state;
    this.props.dispatch({
      type: "EDIT_ITEM",
      payload: {
        id: this.state.id,
        qty: this.state.qty,
      },
    });
  };

  startAllItem = (event) => {
    //prevents default action
    event.preventDefault();
    const { qty, item } = this.state;
    this.props.dispatch({
      type: "START_ALL_ITEM",
      payload: {
        id: this.state.id,
        brand: this.state.brand,
        qty: this.state.qty,
        sku: this.state.sku,
        sku_description: this.state.sku_description,
      },
    });
    this.props.dispatch({
      type: "EDIT_ITEM",
      payload: {
        id: this.state.id,
        qty: 0,
      },
    });
  };

  startItem = (event) => {
    //prevents default action
    event.preventDefault();
    const { qty, item } = this.state;
    this.props.dispatch({
      type: "START_ALL_ITEM",
      payload: {
        id: this.state.id,
        brand: this.state.brand,
        qty: this.state.updated_qty,
        sku: this.state.sku,
        sku_description: this.state.sku_description,
      },
    });
    this.props.dispatch({
      type: "EDIT_ITEM",
      payload: {
        id: this.state.id,
        qty: this.state.qty - this.state.updated_qty,
      },
    });
  };

  //This function dispatched our newly added admin to the database from state
  //We first validate the inputs to make sure we are not sending empty inputs to the server

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

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
        <div className="navbuttonscontainer">
          <Link to="/addadminform">
            <Button style={{ marginLeft: "1%" }} variant="success">
              Add New Item
            </Button>
          </Link>{" "}
        </div>

        {/* The material UI table component, takes in data as props, data is a list of admin brought
 in from global state */}

        <div style={{ padding: "1.5%" }}>
          <MUITable
            data={data} //brings in data as an array, in this case, list of admins
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
  progresslist: state.admin.progresslist,
});
export default connect(mapStateToProps)(StudentEntries);
