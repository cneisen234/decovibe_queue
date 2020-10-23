import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  TableRow,
  TableCell,
} from "@material-ui/core";
import moment from "moment";

class PastEntriesItem extends Component {


  componentWillMount() {
      this.props.dispatch({
        type: "FETCH_ENTRY",
      });
  }


  render() {
    const gunnarStyle = { textAlign:'center' };
    const {entryItem} = this.props;
  

    return (
      
    
      <TableRow>
          <TableCell style={gunnarStyle}>{moment.utc(entryItem.pay_day).format("MMMM Do YYYY")}</TableCell>
          <TableCell style={gunnarStyle}>{moment.utc(entryItem.date_submitted).format("MMMM Do YYYY")}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.pass_class}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.gpa}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.clean_attend}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.detent_hours}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.act_or_job}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.passed_ua}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.current_service_hours}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.hw_rm_attended}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.comments}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.attend_payment}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.pif_donations}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.bonus_amount}</TableCell>
           <TableCell style={gunnarStyle}>{entryItem.bonus_comments}</TableCell>
           <TableCell style={gunnarStyle}>{entryItem.gpa_bonus}</TableCell>
           <TableCell style={gunnarStyle}>{entryItem.amt_to_savings}</TableCell>   
          <TableCell style={gunnarStyle}>{entryItem.money_to_student}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.student_debt}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.student_debt_payment}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.student_debt_remaining}</TableCell>
          <TableCell style={gunnarStyle}>{entryItem.total}</TableCell>
        </TableRow>
    
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  studentHistory: state.studentHistory.studentHistoryReducer,
 
});

export default withRouter(connect(mapStateToProps)(PastEntriesItem));
