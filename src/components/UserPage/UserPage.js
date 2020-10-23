import React from 'react';
import { connect } from 'react-redux';
import StudentHome from '../StudentHome/StudentHome';
import AdminHome from '../AdminHome/AdminHome';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
const UserPage = (props) => (
  <div>
    {/* {JSON.stringify(props.user)} */}
    {props.user.role === 'admin' ? ( //if role is found to be admin, show them this page
   <AdminHome/>
    ) : ( //else if they are not an admin (i.e. student) they are shown this page
 <StudentHome/>
    )}
  {/* <LogOutButton className="log-in" /> */}
  </div>
);

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
