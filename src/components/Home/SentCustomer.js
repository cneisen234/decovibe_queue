import React, { Component } from "react";
import { connect } from "react-redux";
import MUITable from "../MUITable/MUITable";
import { Paper} from "@material-ui/core";
import Button from "react-bootstrap/Button";
import ViewListIcon from "@material-ui/icons/ViewList";
class SentCustomer extends Component {
  state = {
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
    item_type: "",
    toggle2: false,
  };
  componentDidMount() {
    this.props.dispatch({
      type: "GET_CONFIRM_LIST",
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
  toggle2 = () => {
    this.setState({
      toggle2: !this.state.toggle2,
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

  render() {
    const data = this.props.confirmlist.map((item) => [
      item.order_number,
      item.first_name,
      item.last_name,
      item.item_type,
      item.assigned,
      item.created_at,
      item.priority,
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>Sent To Customer</h1>
        </center>
        <div style={{ padding: "1.5%" }}>
          <br />
          <br />
          <br />
          <MUITable
            data={data}
            columns={[
              //names the columns found on MUI table
              { name: "Order Number" },
              { name: "First Name" },
              { name: "Last Name" },
              { name: "Item Type" },
              { name: "Assigned" },
              { name: "Created At" },
              { name: "Priority" },
              {
                name: "View Details",
                options: {
                  filter: false,
                  sort: false,
                  empty: true,
                  customBodyRenderLite: (dataIndex, rowIndex) => {
                    //shows order details
                    return (
                      <>
                        <Button
                          variant="success"
                          onClick={(event) => {
                            event.preventDefault();
                            const itemArray = this.props.confirmlist;
                            const item = itemArray[dataIndex];
                            const order_number = item.order_number;
                            const sku = item.sku;
                            const description = item.description;
                            const email = item.email;
                            const first_name = item.first_name;
                            const last_name = item.last_name;
                            const qty = item.qty;
                            const assigned = item.assigned;
                            const created_at = item.created_at;
                            const id = item.id;
                            const priority = item.priority;
                            const payment_link = this.state.payment_link;
                            const item_type = item.item_type;
                            this.setState({
                              toggle2: !this.state.toggle2,
                              order_number: order_number,
                              sku: sku,
                              description: description,
                              email: email,
                              first_name: first_name,
                              last_name: last_name,
                              qty: qty,
                              assigned: assigned,
                              created_at: created_at,
                              id: id,
                              priority: priority,
                              payment_link: payment_link,
                              item_type: item_type,
                            });
                            this.props.dispatch({
                              type: "ORDER_DETAILS",
                              payload: {
                                order_number: order_number,
                              },
                            });
                            this.props.dispatch({
                              type: "GET_REPLIES",
                            });
                            setTimeout(() => {
                              this.checkHistory();
                            }, 1000);
                          }}
                        >
                          <ViewListIcon></ViewListIcon>
                        </Button>
                      </>
                    );
                  },
                },
              },
            ]}
            title={"Items Sent to Customer"} //give the table a name
          />
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
                    //define pic as pic and concatnate the index number
                    let itemname = item.name;
                    let itemsku = item.sku;
                    let itemqty = item.quantity;
                    let decoSku = itemsku;
                    let decoSku3 = decoSku.slice(0, 6);
                    let decoSku4 = decoSku.slice(0, 5);
                    let decoSku7 = decoSku.slice(0, 7);
                    let decoSku6 = decoSku.slice(0, 8);
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
                      decoSku7 === "DYESUB-" ||
                      decoSku4 === "FINAL" ||
                      decoSku6 === "FEE-VECT"
                    ) {
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
                                  //if sheet size, cut off extra text
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
                          <tr>
                            <td>
                              ----------------------------------------------
                            </td>
                          </tr>
                        </>
                      );
                    }
                    return null;
                  })}{" "}
                  <tr>
                    <td>
                      <b>Communication History:</b>
                    </td>
                  </tr>
                  {this.props.historylisttable.map((history, index) => {
                    let admincomments = history.admincomments;
                    let customercomments = history.customercomments;
                    let datetime = history.comment_made_at
                    let order_number = history.order_number;
                    return (
                      <>
                        {typeof admincomments === "string" &&
                        order_number === this.props.detailslist[0].order_id ? (
                          <tr>
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              <b>Artist Comments:</b> {admincomments}
                            </td>
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              <b>{datetime}</b>
                            </td>
                          </tr>
                        ) : (
                          <span></span>
                        )}
                        {typeof customercomments === "string" &&
                        order_number === this.props.detailslist[0].order_id ? (
                          <tr>
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              <b>Customer Comments:</b> {customercomments}
                            </td>
                            <td
                              style={{
                                marginLeft: "3%",
                                padding: "10px",
                                width: "25%",
                              }}
                            >
                              <b>{datetime}</b>
                            </td>
                          </tr>
                        ) : (
                          <span></span>
                        )}
                      </>
                    );
                  })}{" "}
                  <br />
                  <br />
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
        <br />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  customitemlist: state.item.customitemlist,
  confirmlist: state.item.confirmlist,
  detailslist: state.item.detailslist,
  historylist: state.item.historylist,
  historylisttable: state.item.historylisttable,
});
export default connect(mapStateToProps)(SentCustomer);
