import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import MUITable from "../MUITable/MUITable";
import { Paper, TextField } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import { auto } from "async";
//import { response } from "express";

// This component is for new
class New extends Component {
  state = {
    toggle: false,
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
      type: "GET_ITEM_LIST",
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
  assignTask = (event) => {
    //prevents default action
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
    })
      this.props.dispatch({
        type: "GET_ITEM_LIST",
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
      item.email,
      item.first_name,
      item.last_name,
      item.order_number,
      item.sku,
      item.product_length,
      item.product_options,
      item.qty,
      item.assigned,
      item.created_at,
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>New</h1>
        </center>
        <div className="navbuttonscontainer"></div>

        <div style={{ padding: "1.5%" }}>
          <MUITable
            data={data} //brings in data as an array, in this case, list of items
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
                name: "Assign",
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
                        Assign
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
                          this.props.dispatch({
                            type: "START_ITEM",
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
                            type: "DELETE_ITEM",
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
                    <option value="Zachary">Zachary </option>{" "}
                    <option value="Levi">Levi </option>{" "}
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
