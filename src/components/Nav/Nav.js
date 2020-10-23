import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import logo from "../../images/image.png";
import HomeIcon from '@material-ui/icons/Home';
import CreateIcon from '@material-ui/icons/Create';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DescriptionIcon from '@material-ui/icons/Description';
import EditIcon from "@material-ui/icons/Edit";

const Nav = (props) => (
  <div className="nav" style={{ display: "inline-block" }}>
    <div
      className="nav-right"
      style={{ diplay: "inline-block", float: "left", paddingTop: "1.5%" }}
    >
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? (
          <>
            <HomeIcon></HomeIcon> Home
          </>
        ) : (
          <>
            <ExitToAppIcon></ExitToAppIcon> Login
          </>
        )}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}

      <>
        <Link className="nav-link" to="/adminmakeentry">
          <EditIcon></EditIcon>
          New
        </Link>
        <Link className="nav-link" to="/totalstudententries">
          <FormatListBulletedIcon></FormatListBulletedIcon>
          In Progress
        </Link>
        <Link className="nav-link" to="/pastadminreports">
          <PlaylistAddCheckIcon></PlaylistAddCheckIcon>
          Complete
        </Link>
        {/* <Link className="nav-link" to="/resetadminpassword">
          <RotateLeftIcon></RotateLeftIcon>
          Reset Password
        </Link> */}
        {/* <Link className="nav-link" to="/instructions">
          <DescriptionIcon></DescriptionIcon>
          Instructions
        </Link> */}
        <LogOutButton className="nav-link" />
      </>
      {/* Always show this link since the about page is not protected */}
      {/* <Link className="nav-link" to="/about">
        About
      </Link> */}
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
