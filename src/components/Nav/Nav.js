import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { Grid } from "@material-ui/core";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from "@material-ui/icons/Edit";

class Nav extends Component {
  componentDidMount() {
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
  render() {
    return (
      <Grid container style={{}}>
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          style={{ backgroundColor: "white", width: "15%", float: "left" }}
        >
          <img
            src="https://cdn11.bigcommerce.com/s-et4qthkygq/images/stencil/177x60/htwlogo_web_1573140308__59565.original.png"
            alt="HTW logo"
          ></img>
        </Grid>

        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {this.props.user.id ? (
          <>
          <Grid
            item
            xs={10}
            sm={10}
            md={9}
            style={{ backgroundColor: "black", width: "15%", float: "left" }}
          >
            <Link className="nav-link" to="/home">
              <EditIcon></EditIcon>New{" "}
              {`(${
                this.props.itemlistcount[0] && this.props.itemlistcount[0].count
              })`}
            </Link>
            <Link className="nav-link" to="/progress">
              <FormatListBulletedIcon></FormatListBulletedIcon>
              In Progress{" "}
              {`(${
                this.props.progresslistcount[0] &&
                this.props.progresslistcount[0].count
              })`}
            </Link>
            <Link className="nav-link" to="/complete">
              <PlaylistAddCheckIcon></PlaylistAddCheckIcon>
              Complete{" "}
              {`(${
                this.props.completelistcount[0] &&
                this.props.completelistcount[0].count
              })`}
            </Link>
            </Grid>
          <Grid
            item
            xs={2}
            sm={2}
            md={1}
            style={{ backgroundColor: "black", width: "15%", float: "left" }}
          >
            <LogOutButton style={{ float: "right" }} className="nav-link" />
            
          </Grid>
          </>
        ) : (
          <Grid
            item
            xs={12}
            sm={12}
            md={10}
            style={{ backgroundColor: "black", width: "15%", float: "left" }}
          >
            <span></span>
          </Grid>
        )}
        {/* Show the link to the info page and the logout button if the user is logged in */}

        <>
          {/* <Link className="nav-link" to="/resetpassword">
          <RotateLeftIcon></RotateLeftIcon>
          Reset Password
        </Link> */}
          {/* <Link className="nav-link" to="/instructions">
          <DescriptionIcon></DescriptionIcon>
          Instructions
        </Link> */}
        </>
        {/* Always show this link since the about page is not protected */}
        {/* <Link className="nav-link" to="/about">
        About
      </Link> */}
      </Grid>
    );
  }
}

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = (state) => ({
  user: state.user,
  itemlistcount: state.item.itemlistcount,
  progresslistcount: state.item.progresslistcount,
  completelistcount: state.item.completelistcount,
});

export default connect(mapStateToProps)(Nav);
