import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Iframe from "react-iframe";
import "./StudentHome.css";

class StudentHome extends Component {
  //TODO: add green banner to show if student has made an entry this pay period
  componentWillMount() {
    this.props.dispatch({
      type: "FETCH_STUDENT_HISTORY",
      payload: this.props.user.lcf_id,
    });
    this.props.dispatch({
      type: "GET_STUDENT_FOR_EDIT",
      payload: this.props.user.lcf_id,
    });
    this.props.dispatch({ type: "FETCH_ENTRIES_FOR_ADMIN" });
  }

  total(amount, previous_savings) {
    let total = 0;
    for (let i = 0; i < amount.length; i++) {
      const element = amount[i];
      total += Number(element.amt_to_savings);
    }
    for (let i = 0; i < previous_savings.length; i++) {
      const element = previous_savings[i];
      console.log(element.savings)
      console.log(this.props.user.lcf_id)
      if (this.props.user.lcf_id === element.lcf_id) {
        total = total + element.savings
      }
    }
    return Number(total)
  }

  render() {
    return (
      <div style={{ width: "99%" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12} style={{ marginTop: "2%" }}>
            <center>
              {this.props.editStudent ? (
                <h1>Hello there {this.props.editStudent.first_name}!</h1>
              ) : (
                <h1>Hello there {this.props.user.email}!</h1>
              )}
              <h3>LCF ID: {this.props.user.lcf_id}</h3>
            </center>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Paper
              elevation={5}
              style={{ border: "", padding: "4%", margin: "3%" }}
            >
              <center>
                <Iframe
                  // style="width: 90%"
                  src="https://calendar.google.com/calendar/embed?title=Legacy%20Calendar&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=b88a8t126lf3cofcti721mu8pc%40group.calendar.google.com&amp;color=%23333333&amp;src=cfmdroilnfj71ep58mjic8bjv0%40group.calendar.google.com&amp;color=%238D6F47&amp;src=60i842s5uglu16too6f0bs5nq0%40group.calendar.google.com&amp;color=%236B3304&amp;src=66tdpj4tskh9o7qdb0n5ffs81k%40group.calendar.google.com&amp;color=%2323164E&amp;src=prbvfdkrlj30d1p4osinnmsqq0%40group.calendar.google.com&amp;color=%232F6309&amp;src=5ukrumpstnq37u91sc23jo3iio%40group.calendar.google.com&amp;color=%23711616&amp;src=f061r68qd6vc7db0l4qi5k0jio%40group.calendar.google.com&amp;color=%2329527A&amp;src=rb038vtg2r577kgn962nlvlru8%40group.calendar.google.com&amp;color=%23B1440E&amp;src=kbkdiah43goo8388rc29f6bk3k%40group.calendar.google.com&amp;color=%23B1365F&amp;src=fargoschools.org_ag5ihl34v5q8l3u50rttd05k24%40group.calendar.google.com&amp;color=%23B1440E&amp;ctz=America%2FChicago"
                  width="100%"
                  height="400"
                  frameborder="0"
                  scrolling="no"
                ></Iframe>
              </center>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Paper elevation={5} style={{ padding: "4%", margin: "5%" }}>
              <h3>Payment Information</h3>
              <hr></hr>
              {this.props.editStudent ? (
                <>
                  Last Paycheck: ${" "}
                  {this.props.studentHistory[0]
                    ? this.props.studentHistory[0].money_to_student
                    : "0.00"}
                  {/* need conditional here or wont load*/}
                  <br />
                  Balance to Pay: $ {this.props.editStudent.balance_due}
                  <br />
                  Total Savings to Date: ${" "}
                  {this.total(this.props.studentHistory, this.props.students)}
                </>
              ) : (
                <>
                  Last Paycheck: $$
                  <br />
                  Balance to Pay: $$
                  <br />
                  Total Savings to Date: $$
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
        <br/>
        <br/>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  editStudent: state.editStudent[0],
  studentHistory: state.studentHistory.studentHistoryReducer,
  entries: state.students.studententriesadmin,
  students: state.students.studentlist,
});

export default withRouter(connect(mapStateToProps)(StudentHome));
