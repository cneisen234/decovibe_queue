import React, {Component}  from 'react';
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import MUITable from '../MUITable/MUITable';
import Swal from "sweetalert2";
import moment from "moment";



class OpenTransactions extends Component {

  

componentDidMount () {
  console.log('this means page is running');
  // this.props.dispatch({type: 'FETCH_CALCULATIONS'})
  
  
}

runConfirm() {
 Swal.fire({
   title: "Please confirm details below",
   html: `Clicking "Confirm Report" will run the report. <br/> This action can't be undone. <br/>
      Please review the information for any discrepancies. 
      Click cancel to correct any mistakes and rerun the report when corrections are made.<br/>
      If you are sure the information is correct, click "Confirm Report" to run the report`,
   icon: "question",
   showCancelButton: true,
   confirmButtonColor: "#5cb85c",
   cancelButtonColor: "#d33",
   confirmButtonText: "Confirm Report",
 }).then((result) => {
   if (result.value) {
     this.props.dispatch({ type: "FETCH_CONFIRM" });
     Swal.fire("Success!", "Your entry has been logged.", "success");
     this.props.history.push("/home");
     console.log("state is", this.state);
   }
 });
  };
 

pageRedirect() {
  if(this.props.redirect.redirectHome === true){
    return <Redirect to="/pastadminreports"/>
  }
}

  render() {

    console.log(this.props.calculations)
    
    return(
     
     <div style={{paddingBottom:'2%', paddingLeft:'2%', paddingRight:'2%'}}>
       {this.pageRedirect()}
       <center><h1 >Review Payroll for Students</h1></center> <br/>
     <MUITable
     
            data={this.props.calculations
            .map((entry) => [
                entry.lcf_id,
                entry.first_name,
                entry.last_name, 
                moment.utc(entry.pay_day).format("L"),
                moment.utc(entry.date_submitted).format("L"),              
                entry.pass_class,
                entry.gpa,
                entry.clean_attend,
                entry.detent_hours,
                entry.act_or_job,
                entry.passed_ua,
                entry.current_service_hours,
                entry.hw_rm_attended,
                entry.comments,
                entry.attend_payment,
                entry.pif_donations,
                entry.bonus_amount,
                entry.bonus_comments,
                entry.gpa_bonus,
                entry.amt_to_savings,
                entry.money_to_student,
                entry.student_debt,
                entry.student_debt_payment,
                entry.student_debt_remaining,
                entry.total
              ])}
            columns={[
              "LCF ID",
              "First Name",
              "Last Name",
              "Pay Day",
              "Day Submitted",
              "Passing All Classes?",
              "GPA",
              "Clean Attendance",
              "Detention Hours",
              "After School Activities",
              "Drug Free Life?",
              "Service Hrs",
              "Homeroom attended?",
              "Comments",
              "attend_payment",
              "pif_donations",
              "bonus_amount",
              "bonus_comments",
              "GPA Bonus",
              "Amount to Savings",
              "Money to Student",
              "Student Debt",
              "Student Debt Payment",
              "Student Debt Remaining",
              "Total",
              
            ]}
            title={"Review Student Entries"}
          />
          <Link to='/totalstudententries'>
          <Button
          style={{ margin: "3%" }}
          variant='danger'
        >
          Cancel
        </Button>
        </Link>
      <Button
      variant='success'
          style={{ margin: "3%" }}
          onClick={(event) => this.runConfirm(event)}
        >
          Confirm Report
        </Button>
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
  redirect: state.redirect
});

export default connect(mapStateToProps)(OpenTransactions);
