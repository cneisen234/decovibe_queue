import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import moment from "moment";
import MUITable from "../MUITable/MUITable";
import { Paper, TextField } from "@material-ui/core";
import { auto } from "async";

class Complete extends Component {
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
      type: "GET_COMPLETE_LIST",
    });
  }
  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value }); //sets to value of targeted event
  }; //end handleChange
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };

  render() {
    const data = this.props.completelist.map((complete) => [
      complete.brand,
      complete.sku,
      complete.sku_description,
      complete.qty,
      moment.utc(complete.created_at).format("MMMM Do YYYY"),
    ]);
    return (
      <div>
        <br />
        <center>
          <h1>Complete</h1>
        </center>
        <div className="navbuttonscontainer">
          <Link to="/addadminform">
            <Button style={{ marginLeft: "1%" }} variant="success">
              Completed Items
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
                          const itemArray = this.props.completelist;

                          const item = itemArray[dataIndex];
                          console.log(`entry id should be: ${item.id}`);
                          // alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)

                          this.props.dispatch({
                            type: "DELETE_COMPLETE",
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
  completelist: state.admin.completelist,
});
export default connect(mapStateToProps)(Complete);
