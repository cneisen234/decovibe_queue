import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MUITable from "../MUITable/MUITable";
import moment from "moment";
import { withRouter } from "react-router";
import Swal from "sweetalert2";
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import EditIcon from '@material-ui/icons/Edit';
//import { response } from "express";

// This component is for the admin homepage
class AdminHome extends Component {
  componentDidMount() {

    this.props.dispatch({
      type: "GET_ADMIN",
    });
  }

  render() {

    //The constants below are for the MUI table
    //
    const columns = [
      
      // The code below gives information for headings for the MUI table
      {
        name: "First Name",
        options: {
          filter: true,
        },
      },
      {
        label: "Last Name",
        name: "Last Name",
        options: {
          filter: true,
        },
      },
      {
        name: "Last Login",
        options: {
          filter: true,
        },
      },
      {
        name: "Grade",
        options: {
          filter: false,
        },
      },
      {
        name: "Graduation Year",
        options: {
          filter: true,
        },
      },
      {
        name: "School Name",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "LCF ID",
        options: {
          filter: true,
        },
      },
      {
        name: "LCF Start Date",
        options: {
          filter: true,
        },
      },
    ];

    return (
      <div><br/>
        <center><h1 >Admin Homepage</h1></center>

        <br/>
      <br/>
      <br/>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(AdminHome));
