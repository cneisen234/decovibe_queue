import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { TextField, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";
import Paper from "@material-ui/core/Paper";

class OrderLookup extends Component {
  state = {
    toggle: false,
    order_number: "",
  };
  componentDidMount() {
  } //end componentDidMount

  //This function handles storing input values into state on change
  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  }; //end handleChange

  //this function sends information to the server to store in the database
  orderLookup = (event) => {
    //prevents any default actions
    event.preventDefault();
    //grabs local state and defines it in a var of the same name
    const { order_number } = this.state;
        //end sweetAlerts
          this.props.dispatch({
            type: "ORDER_LOOKUP",
            payload: {
              order_number: order_number,
            },
          });
            this.props.dispatch({
              type: "SHIPPING_LOOKUP",
              payload: {
                order_number: order_number,
              },
            });
  }; //ends SubmitInfo
  render() {
          let itemid = this.props.orderlist.id;
          let date_created = this.props.orderlist.date_created;
          let date_modified = this.props.orderlist.date_modified;
          let date_shipped = this.props.orderlist.date_shipped;
          let status = this.props.orderlist.status;
          let subtotal_ex_tax = this.props.orderlist.subtotal_ex_tax;
          let subtotal_inc_tax = this.props.orderlist.subtotal_inc_tax;
          let subtotal_tax = this.props.orderlist.subtotal_tax;
          let base_shipping_cost = this.props.orderlist.base_shipping_cost;
          let shipping_cost_ex_tax = this.props.orderlist.shipping_cost_ex_tax;
          let shipping_cost_inc_tax = this.props.orderlist.shipping_cost_inc_tax;
          let shipping_cost_tax = this.props.orderlist.shipping_cost_tax;
          let total_ex_tax = this.props.orderlist.total_ex_tax;
          let total_inc_tax = this.props.orderlist.total_inc_tax;
          let total_tax = this.props.orderlist.total_tax;
          let items_total = this.props.orderlist.items_total;
          let items_shipped = this.props.orderlist.items_shipped;
          let payment_method = this.props.orderlist.payment_method;
          let payment_status = this.props.orderlist.payment_status;
          let refunded_amount = this.props.orderlist.refunded_amount;
          let ip_address = this.props.orderlist.ip_address;
          let geoip_country = this.props.orderlist.geoip_country;
          let currency_code = this.props.orderlist.currency_code;
          let discount_amount = this.props.orderlist.discount_amount;
          let coupon_discount = this.props.orderlist.coupon_discount;
        //   let billing_first_name = this.props.orderlist.billing_address.first_name;
        //   let billing_last_name = this.props.orderlist.billing_address.last_name;
        //   let billing_street_1 = this.props.orderlist.billing_address.street_1;
        //   let billing_street_2 = this.props.orderlist.billing_address.street_2;
        //   let billing_city = this.props.orderlist.billing_address.city;
        //   let billing_state = this.props.orderlist.billing_address.state;
        //   let billing_zip = this.props.orderlist.billing_address.zip;
        //   let billing_country = this.props.orderlist.billing_address.country;
        //   let billing_phone = this.props.orderlist.billing_address.phone;
        //   let billing_email = this.props.orderlist.billing_address.email;
          let shipping_first_name = this.props.shippinglist[0] && this.props.shippinglist[0].first_name;
          let shipping_last_name =
            this.props.shippinglist[0] && this.props.shippinglist[0].last_name;
          let shipping_street_1 =
            this.props.shippinglist[0] && this.props.shippinglist[0].street_1;
          let shipping_street_2 =
            this.props.shippinglist[0] && this.props.shippinglist[0].street_2;
          let shipping_city =
            this.props.shippinglist[0] && this.props.shippinglist[0].city;
          let shipping_state =
            this.props.shippinglist[0] && this.props.shippinglist[0].state;
          let shipping_zip =
            this.props.shippinglist[0] && this.props.shippinglist[0].zip;
          let shipping_country =
            this.props.shippinglist[0] && this.props.shippinglist[0].country;
          let shipping_phone =
            this.props.shippinglist[0] && this.props.shippinglist[0].phone;
          let shipping_email =
            this.props.shippinglist[0] && this.props.shippinglist[0].email;
    return (
      <div>
        {this.state.toggle === false ? (
          <>
            <br />
            <br />
            <Paper
              elevation={5}
              style={{
                padding: "5%",
                marginLeft: "5%",
                marginRight: "5%",
                marginBottom: "5%",
              }}
            >
              <form onSubmit={this.orderLookup}>
                <center>
                  <p>Type the order number in below</p>
                  <TextField
                    style={{
                      backgroundColor: "white",
                      margin: "5px",
                    }}
                    variant="outlined"
                    label="Order Number here"
                    name="order_number"
                    // sets value of input to local state
                    value={this.state.order_number}
                    type="text"
                    maxLength={1000}
                    //onChange of input values set local state
                    onChange={(event) =>
                      this.handleChange(event, "order_number")
                    } //onChange of input values set local state
                  />
                </center>
                <center>
                  <Button
                    style={{
                      //note that it only goes through if it passes all validation
                      marginTop: "3%",
                      marginLeft: "5%",
                      marginRight: "5%",
                      backgroundColor: "green",
                      color: "white",
                    }}
                    variant="contained"
                    type="submit"
                    color="primary"
                    className="button"
                  >
                    CheckOrder
                  </Button>
                </center>
              </form>
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
                    className="order_number"
                  >
                    <b>Order Number:</b> <i>{itemid}</i>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      marginLeft: "3%",
                      padding: "10px",
                      width: "25%",
                    }}
                    className="status"
                  >
                    <b>Status:</b> <i>{status}</i>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      marginLeft: "3%",
                      padding: "10px",
                      width: "25%",
                    }}
                    className="total_items"
                  >
                    <b>Total Items:</b> <i>{items_total}</i>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      marginLeft: "3%",
                      padding: "10px",
                      width: "25%",
                    }}
                    className="total_items_shipped"
                  >
                    <b>Total Items Shipped:</b> <i>{items_shipped}</i>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      marginLeft: "3%",
                      padding: "10px",
                      width: "25%",
                    }}
                    className="payment_status"
                  >
                    <b>Payment Status:</b> <i>{payment_status}</i>
                  </td>
                </tr>
                <br />
                <tr>
                  <td
                    style={{
                      marginLeft: "3%",
                      padding: "10px",
                      width: "25%",
                    }}
                  >
                    <b>Shipping Address</b>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      marginLeft: "3%",
                      padding: "10px",
                      width: "25%",
                    }}
                    className="shipping_first_name"
                  >
                    <b>Name:</b>{" "}
                    <i>
                      {shipping_first_name} {shipping_last_name}
                    </i>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      marginLeft: "3%",
                      padding: "10px",
                      width: "25%",
                    }}
                    className="shipping_street_1"
                  >
                    <b>Address:</b> <i>{shipping_street_1} {shipping_city} {shipping_state} {shipping_zip}</i>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      marginLeft: "3%",
                      padding: "10px",
                      width: "25%",
                    }}
                    className="shipping_phone"
                  >
                    <b>Phone:</b> <i>{shipping_phone}</i>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      marginLeft: "3%",
                      padding: "10px",
                      width: "25%",
                    }}
                    className="shipping_email"
                  >
                    <b>Email:</b> <i>{shipping_email}</i>
                  </td>
                </tr>
                <br />
                <br />
              </table>
            </Paper>
            <br />{" "}
            {/*Add a little buffer on the bottom of page (prevent cutoff on mobile) */}
            <br />
          </>
        ) : (
          <>
            <br />
            <br />
            <br />
            <br />
            {/*show this only after the customer has submitted, to confirm submission and also prevent duplicate submissions*/}
            <h1 style={{ textAlign: "center" }}>
              Thank you for your feedback.
              <br /> The art department will follow up with you after they've
              reviewed your response
            </h1>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orderlist: state.item.orderlist,
  shippinglist: state.item.shippinglist,
});

export default withRouter(connect(mapStateToProps)(OrderLookup));
