import React, {Component} from 'react';
import { connect } from 'react-redux';
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import moment from "moment";
import MUITable from '../MUITable/MUITable';


//This page shows the list of admins currently part of the organization
//A button on this page allows the admin to add a new admin (AddAdminForm component)
class AddAdmin extends Component {

      componentDidMount () {
   this.props.dispatch({
     type: 'GET_ADMIN'
   });
}

//This function dispatched our newly added admin to the database from state
//We first validate the inputs to make sure we are not sending empty inputs to the server
     
//This function handles storing input values into state on change
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

    render () {
      const data = this.props.admin
                .map((entry) => [
                entry.first_name,
                entry.last_name,
                entry.email,
                entry.role,
                moment.utc(entry.created_at).format("MMMM Do YYYY")
              ])
      return (
      <div><br/>
        <center><h1>Admin Users</h1></center>
        {this.props.user.role === "admin" && (
          <div className="navbuttonscontainer">
            <Link to="/addadminform">
              <Button style={{marginLeft:'1%'}} variant="success">Add Admin</Button>
            </Link>{" "}
            
          </div>
        )}
          

 {/* The material UI table component, takes in data as props, data is a list of admin brought
 in from global state */}

        <div style={{padding:'1.5%'}}>
    <MUITable
            data={data} //brings in data as an array, in this case, list of admins
            columns={[ //names the columns found on MUI table
              {name: "First Name"},
              {name: "Last Name"},
              {name: "Admin Email" },
              {name: "Role"},
              {name: "Creation Date"}
            ]}
            title={"LCF Admin List"} //give the table a name
          />
          </div>
          <br/>
          <br/>
          <br/>
      </div>
      );
    }
}


const mapStateToProps = state => ({
  user: state.user,
  admin: state.admin.adminlist,
});
   
export default connect(mapStateToProps) (AddAdmin);