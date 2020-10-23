import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MUITable from "../MUITable/MUITable";
import moment from "moment";

//QUESTION: Do we need another table to store past admin reports in?
//How will we make sure that the past reports hold all the information needed?
//What we want is the ability for the admin to click on the pay period in question
//amd get presented with a table of all the students' entries for that pay period
class PastAdminDeductions extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_DEDUCTIONS",
    });
  }

  render() {
    return (

   
   
       <div style={{padding: '2%'}}>
      <center><h1 >Past Deductions</h1></center><br/>
     
     <MUITable
     
            data={this.props.deductionList
            .map((item) => [
                item.lcf_id,
                item.first_name,
                item.last_name,
                moment.utc(item.date).calendar(),
                item.type,
                item.description,
                item.amount,
                

              ])}
            columns={[
              "LCF ID",
              "First Name",
              "Last Name",
              "Date",
              "Type",
              "Description",
              "Amount",
              
            ]}
            title={"Past Deductions"}
          />
      
          <br/>
          <br/>
         
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
  entries: state.students.studententriesadmin,
  calculations: state.calculations.calculations,
  history: state.history.history,
  deductionList: state.deductionList.deductionList,
});

export default withRouter(connect(mapStateToProps)(PastAdminDeductions));
