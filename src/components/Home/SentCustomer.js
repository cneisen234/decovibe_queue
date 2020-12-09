import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import moment from "moment";
import MUITable from "../MUITable/MUITable";
import swal from "sweetalert";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DeleteIcon from "@material-ui/icons/Delete";

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
    qty: "",
    assigned: "",
    created_at: "",
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

  render() {
    const data = this.props.confirmlist.map((item) => [
      item.order_number,
      item.sku,
      item.description,
      item.qty,
      item.first_name,
      item.last_name,
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
          <MUITable
            data={data}
            columns={[
              //names the columns found on MUI table
              { name: "Order Number" },
              { name: "SKU" },
              { name: "Description" },
              { name: "QTY" },
              { name: "First Name" },
              { name: "Last Name" },
              { name: "Assigned" },
              { name: "Created At" },
              { name: "Priority" },
            ]}
            title={"Items Sent to Customer"} //give the table a name
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
  confirmlist: state.item.confirmlist,
});
export default connect(mapStateToProps)(SentCustomer);
