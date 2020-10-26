import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import MUITable from "../MUITable/MUITable";
import { Paper, TextField } from "@material-ui/core";
import { auto } from "async";
//import { response } from "express";

// This component is for new
class New extends Component {
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
      type: "GET_ITEM_LIST",
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
    this.setState({
      toggle: false,
    })
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
      this.setState({
        toggle2: false,
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
      this.setState({
        toggle2: false,
      });
  };

  //This function handles storing input values into state on change
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const data = this.props.itemlist.map((item) => [
      item.brand,
      item.sku,
      item.sku_description,
      item.qty,
      moment.utc(item.created_at).format("MMMM Do YYYY"),
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>New</h1>
        </center>
        <div className="navbuttonscontainer">
          <Link to="/newform">
            <Button style={{ marginLeft: "1%" }} variant="success">
              Add New Item
            </Button>
          </Link>{" "}
        </div>

        <div style={{ padding: "1.5%" }}>
          <MUITable
            data={data} //brings in data as an array, in this case, list of items
            columns={[
              //names the columns found on MUI table
              { name: "Category/Brand" },
              { name: "SKU" },
              { name: "SKU Description" },
              { name: "QTY" },
              { name: "Date" },
              {
                name: "Update QTY",
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
                          const itemArray = this.props.itemlist;
                          const item = itemArray[dataIndex];
                          this.setState({
                            toggle: !this.state.toggle,
                            id: item.id,
                          });
                        }}
                      >
                        Update QTY
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
                    return (
                      <Button
                        variant="success"
                        onClick={(event) => {
                          event.preventDefault();
                          const itemArray = this.props.itemlist;
                          const item = itemArray[dataIndex];
                          console.log(
                            `entry id should be: ${item.id} ${item.qty} ${item.sku_description} ${item.sku} ${item.brand}`
                          );
                          this.setState({
                            toggle2: !this.state.toggle2,
                            id: item.id,
                            sku: item.sku,
                            sku_description: item.sku_description,
                            qty: item.qty,
                            brand: item.brand,
                          });
                        }}
                      >
                        Start
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
                          const itemArray = this.props.itemlist;

                          const item = itemArray[dataIndex];
                          console.log(`entry id should be: ${item.id}`);
                          // alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)

                          this.props.dispatch({
                            type: "DELETE_ITEM",
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
            title={"New Items"} //give the table a name
          />
          {this.state.toggle === false ? (
            //if toggle is false, render nothing. This is the default
            <span></span>
          ) : (
            //...else render the edit screen for the selected song
            <Paper
              style={{
                right: 0,
                bottom: 0,
                position: "fixed",
                borderRadius: "10%",
                height: "400px",
                width: "400px",
                fontSize: "15px",
                backgroundColor: "white",
                zIndex: Infinity,
              }}
              elevation="24"
              className="loginBox"
            >
              <td
                style={{
                  backgroundColor: "white",
                }}
              >
                {" "}
                <form onSubmit={this.editItem}>
                  <TextField
                    variant="outlined"
                    required
                    label="qty"
                    name="qty"
                    // sets value of input to local state
                    value={this.state.qty}
                    type="text"
                    maxLength={1000}
                    onChange={(event) => this.handleChange(event, "qty")} //onChange of input values set local state
                  />
                  <br />
                  {/* onClick tied to form element, runs submitInfo on click */}
                  <Button variant="success" type="submit">
                    Edit qty
                  </Button>
                </form>
                {/* toggles edit window back to not displaying */}
                <Button onClick={this.toggle} variant="success" type="submit">
                  Go Back
                </Button>
              </td>
            </Paper>
          )}
          {this.state.toggle2 === false ? (
            //if toggle is false, render nothing. This is the default
            <span></span>
          ) : (
            //...else render the edit screen for the selected song
            <Paper
              style={{
                right: 0,
                bottom: 0,
                position: "fixed",
                borderRadius: "10%",
                height: "400px",
                width: "400px",
                fontSize: "15px",
                backgroundColor: "white",
                zIndex: Infinity,
              }}
              elevation="24"
              className="loginBox"
            >
              <td
                style={{
                  backgroundColor: "white",
                }}
              >
                {" "}
                <form onSubmit={this.startItem}>
                  <TextField
                    variant="outlined"
                    required
                    label="qty"
                    name="qty"
                    // sets value of input to local state
                    value={this.state.updated_qty}
                    type="text"
                    maxLength={1000}
                    onChange={(event) =>
                      this.handleChange(event, "updated_qty")
                    } //onChange of input values set local state
                  />
                  <br />
                  {/* onClick tied to form element, runs submitInfo on click */}
                  <Button variant="success" type="submit">
                    Start selected qty
                  </Button>
                </form>
                <form onSubmit={this.startAllItem}>
                  <Button variant="success" type="submit">
                    Start entire QTY
                  </Button>
                </form>
                {/* toggles edit window back to not displaying */}
                <Button onClick={this.toggle2} variant="success" type="submit">
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
  itemlist: state.item.itemlist,
});
export default connect(mapStateToProps)(New);
