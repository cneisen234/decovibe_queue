import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import moment from "moment";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";


//The purpose of this page is to add an user to the system, only seen by an user user

class AddUserForm extends Component {
  state = {
    brand: "",
    sku: "",
    sku_description: "",
    qty: "",
    created_at: moment.utc().format(),
  };
  componentDidMount() {}

  //This function handles inputs and stores them in state
  handleInputChangeFor = (propertyName) => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  };//End of handleInputChangeFor

  registerUser = (event) => {
    event.preventDefault();

    console.log("we are about to send the state", this.state);
    //The if statement below validates the inputs, does not send them if any are empty
    if (
      this.state.brand &&
      this.state.sku &&
      this.state.sku_description &&
      this.state.qty &&
      this.state.created_at
    ) {
      //send the new user to the server through a redux saga
    
      //This is a sweet alerts confirmation, there is a nested redux saga dispatch 
      //If successful, it will route the user to the home page
       
         this.props.dispatch({
           type: "ADD_NEW_ITEM",
           payload: {
             brand: this.state.brand,
             sku: this.state.sku,
             sku_description: this.state.sku_description,
             qty: this.state.qty,
             created_at: this.state.created_at,
           },
         });
         this.props.history.push("/home")
         
    } else {
      this.props.dispatch({ type: "ADD_USER_ERROR" });
    }
  }; // end registerUser

  render() {
 
    return (
      <div>
        <br />
        <center>
          <h1>Add A New Item</h1>
        </center>
        <Paper
          elevation={5}
          style={{ width: "95%", margin: "3% auto", padding: "2%" }}
        >
          <Form className="addstudent">
            <Row>
              <Col>
                <Form.Label>Category/Brand</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(event) =>
                    this.setState({ brand: event.target.value })
                  }
                >
                  <option value="">Pick From Below</option>
                  <option value="Stock Rhinestones">Stock Rhinestones</option>
                  <option value="Custom Sign Fashion">
                    Custom Sign Fashion
                  </option>
                  <option value="Custom Digital">Custom Digital</option>
                </Form.Control>
              </Col>

              <Col>
                <Form.Label>SKU</Form.Label>
                <Form.Control
                  placeholder="SKU"
                  type="text"
                  name="SKU"
                  value={this.state.sku}
                  onChange={this.handleInputChangeFor("sku")}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Label>SKU Description</Form.Label>
                <Form.Control
                  placeholder="SKU Description"
                  type="text"
                  name="SKU Description"
                  value={this.state.sku_description}
                  onChange={this.handleInputChangeFor("sku_description")}
                />
              </Col>
              <Col>
                <Form.Label>QTY</Form.Label>
                <Form.Control
                  placeholder="QTY"
                  type="number"
                  name="QTY"
                  value={this.state.qty}
                  onChange={this.handleInputChangeFor("qty")}
                />
              </Col>
            </Row>
            <center>
              <Link to="/home">
                <Button
                  onClick={(event) => this.registerUser(event)}
                  variant="success"
                  type="submit"
                  style={{ width: "20%", margin: "1%" }}
                >
                  Add New Item
                </Button>
              </Link>
            </center>
          </Form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.userlist,
});

export default withRouter(connect(mapStateToProps)(AddUserForm));
