import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import MUITable from "../MUITable/MUITable";
import {Paper, TextField} from '@material-ui/core'; 
import { auto } from "async";

//This page shows the list of admins currently part of the organization
//A button on this page allows the admin to add a new admin (AddAdminForm component)
class AddAdmin extends Component {
  state = {
    toggle: false,
    qty: "",
    id: "",
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

  //This function dispatched our newly added admin to the database from state
  //We first validate the inputs to make sure we are not sending empty inputs to the server

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
        {JSON.stringify(this.state)}
        <br />
        <center>
          <h1>New</h1>
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
                          this.setState({
                          toggle: !this.state.toggle,
                          id: item.id,
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
                  <button
                    className="recommendationButton"
                    variant="contained"
                    color="secondary"
                    type="submit"
                  >
                    Edit qty
                  </button>
                </form>
                {/* toggles edit window back to not displaying */}
                <button
                  onClick={this.toggle}
                  className="recommendationButton"
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Go Back
                </button>
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
  itemlist: state.admin.itemlist,
});

export default connect(mapStateToProps)(AddAdmin);
