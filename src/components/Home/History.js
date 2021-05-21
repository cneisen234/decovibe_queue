import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import MUITable from "../MUITable/MUITable";
import { Paper } from "@material-ui/core";
import Form from "react-bootstrap/Form";
import ViewListIcon from "@material-ui/icons/ViewList";

class History extends Component {
  state = {
    toggle2: false,
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
    comments: "",
  };
  componentDidMount() {
    //gets the customer coraspondance history
    this.props.dispatch({
      type: "GET_HISTORY_LIST",
    });
      this.props.dispatch({
        type: "GET_CUSTOM_ITEM_LIST",
      });
    //gets total count of all queues
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
    //deletes any items in complete or history that meet the cut off dates defined in the server
    this.props.dispatch({
      type: "DELETE_COMPLETE_RANGE",
    });
     this.props.dispatch({
       type: "DELETE_HISTORY_RANGE",
     });
  }

  checkHistory = (event) => {
    //prevents default action
    event.preventDefault();
    const { email } = this.state;
    this.props.dispatch({
      type: "CHECK_HISTORY",
      payload: {
        email: email,
      },
    });
  };

  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value }); //sets to value of targeted event
  }; //end handleChange

  toggle2 = () => {
    this.setState({
      toggle2: !this.state.toggle2,
    });
    this.props.dispatch({
      type: "GET_HISTORY_LIST",
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

  render() {
    const data = this.props.historylisttable.map((history) => [
      history.order_number,
      history.sku,
      history.qty,
      history.first_name,
      history.last_name,
      history.assigned,
      history.admincomments,
      history.customercomments,
      history.comment_made_at,
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>Communication History</h1>
        </center>

        <div style={{ padding: "1.5%" }}>
          <center>
            <Form.Control
              as="select"
              onChange={(event) => this.setState({ email: event.target.value })}
            >
              <option value="">Pick From Below </option>{" "}
              {this.props.historylist
                ? this.props.historylist.map((item) => (
                    //select the names of customers
                    <option key={item.id} value={item.email}>
                      {" "}
                      {String(item.first_name + " " + item.last_name)}{" "}
                    </option>
                  ))
                : ""}
            </Form.Control>
            <Form>
              <center>
                <Button
                  onClick={(event) => this.checkHistory(event)}
                  variant="primary"
                  type="submit"
                  style={{ width: "20%", margin: "2%" }}
                >
                  Confirm Customer
                </Button>
              </center>
            </Form>
          </center>
          {/* ...and the table will only populate with the info from the selected customer */}
          <br />
          <br />
          <br />
          <MUITable
            data={data}
            columns={[
              //names the columns found on MUI table
              { name: "Order Number" },
              { name: "SKU" },
              { name: "QTY" },
              { name: "First Name" },
              { name: "Last Name" },
              { name: "Assigned" },
              { name: "Decovibe Comments" },
              { name: "Customer Comments" },
              { name: "Comment Made At" },
              //view order details
              {
                name: "View Details",
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
                          const itemArray = this.props.historylisttable;
                          const item = itemArray[dataIndex];
                          const order_number = item.order_number;
                          const sku = item.sku;
                          const email = item.email;
                          const first_name = item.first_name;
                          const last_name = item.last_name;
                          const qty = item.qty;
                          const assigned = item.assigned;
                          const id = item.id;
                          this.setState({
                            toggle2: !this.state.toggle2,
                            order_number: order_number,
                            sku: sku,
                            email: email,
                            first_name: first_name,
                            last_name: last_name,
                            qty: qty,
                            assigned: assigned,
                            id: id,
                          });
                          this.props.dispatch({
                            type: "ORDER_DETAILS",
                            payload: {
                              order_number: order_number,
                            },
                          });
                        }}
                      >
                        <ViewListIcon></ViewListIcon>
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
          //if toggle2 is false, render nothing. This is the default
          <span></span>
        ) : (
          //...else render the order details
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
                  width: "100%",
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
                <tr>
                  <td
                    style={{
                      marginLeft: "3%",
                      padding: "10px",
                      width: "25%",
                    }}
                  >
                    <b>Order Number: </b>{" "}
                    {this.props.detailslist[0] &&
                      this.props.detailslist[0].order_id}
                  </td>
                </tr>
                {this.props.detailslist.map((item, index) => {
                  let itemname = item.name;
                  let itemsku = item.sku;
                  let itemqty = item.quantity;
                  return (
                    <>
                      <tr>
                        <td
                          style={{
                            marginLeft: "3%",
                            padding: "10px",
                            width: "25%",
                          }}
                        >
                          <b>Name:</b> {itemname}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            marginLeft: "3%",
                            padding: "10px",
                            width: "25%",
                          }}
                        >
                          <b>Sku:</b> {itemsku}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            marginLeft: "3%",
                            padding: "10px",
                            width: "25%",
                          }}
                        >
                          <b>QTY:</b> {itemqty}
                        </td>
                      </tr>
                      <tr></tr>
                      {item.product_options.map((product, index) => {
                        let display_name = product.display_name;
                        let display_value = product.display_value;
                        let new_display_name = display_name.slice(0, 10);
                        return (
                          <>
                            {new_display_name === "Sheet Size" ? (
                              <tr>
                                <td
                                  style={{
                                    marginLeft: "3%",
                                    padding: "10px",
                                    width: "25%",
                                  }}
                                >
                                  <b>{new_display_name}:</b> {display_value}
                                </td>
                              </tr>
                            ) : display_name === "Transfer Count" ? (
                              <span></span>
                            ) : (
                              <tr>
                                <td
                                  style={{
                                    marginLeft: "3%",
                                    padding: "10px",
                                    width: "25%",
                                  }}
                                >
                                  <b>{display_name}:</b> {display_value}
                                </td>
                              </tr>
                            )}
                          </>
                        );
                      })}{" "}
                      <br />
                      <br />
                    </>
                  );
                })}{" "}
                <br />
                {/* toggles display window back to not displaying */}
                <Button onClick={this.toggle2} variant="success" type="submit">
                  Close
                </Button>
              </table>

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
//grabs customitems, history, historytablem and details from BigCommerce API
const mapStateToProps = (state) => ({
  customitemlist: state.item.customitemlist,
  historylist: state.item.historylist,
  historylisttable: state.item.historylisttable,
  detailslist: state.item.detailslist,
});
export default connect(mapStateToProps)(History);
