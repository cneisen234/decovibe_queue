import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MUITable from '../MUITable/MUITable';
import moment from "moment";
import InfoIcon from '@material-ui/icons/Info';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FilterListIcon from '@material-ui/icons/FilterList';
import Swal from "sweetalert2";

//QUESTION: Do we need another table to store past admin reports in?
//How will we make sure that the past reports hold all the information needed?
//What we want is the ability for the admin to click on the pay period in question
//amd get presented with a table of all the students' entries for that pay period
class PastAdminReports extends Component {
  state = {
    lcf_id: "",
    toggle: false,
  };
  componentDidMount() {
    this.props.dispatch({
      type: "FETCH_HISTORY",
    });
  }

  checkTrip = (event) => {
    event.preventDefault();
    let counter = 0;
    let totalMaps = 0;
    this.props.history.map((item, index) => {
      if (item.lcf_id === Number(this.state.lcf_id)) {
        if (item.attend_payment != "0.00") {
          counter++;
          console.log("counter", counter);
        }
        totalMaps++;
      }

      console.log("totalMaps", totalMaps);
      console.log("calc", counter / totalMaps);
    });
    if (counter / totalMaps < 0.8) {

      Swal.fire("This student is not eligible for a trip");
          const {
      lcf_id,
    } = this.state;
      this.props.dispatch({
            type: "CHECK_TRIP",
            payload: {
              lcf_id: lcf_id,
              trip: "no",
            },
          })
  
    } else {
      Swal.fire("this student is eligible for a trip");
       const { lcf_id } = this.state;
       this.props.dispatch({
         type: "CHECK_TRIP",
         payload: {
           lcf_id: lcf_id,
           trip: "yes",
         },
       });
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  didWePay = (event) => {
    this.setState({
      toggle: true,
    })
      let date = moment().format("L");
      date = new Date(date);
      this.props.history.map((item) => {
        item.pay_day = new Date(item.pay_day);
        let previous_pay_day = moment(item.pay_day).subtract(2, "weeks");
        previous_pay_day = moment(previous_pay_day).format("L");
        previous_pay_day = new Date(previous_pay_day);
        console.log(item.pay_day);
        console.log(date);
        console.log(previous_pay_day);
        if (date >= previous_pay_day) {
            this.props.dispatch({
              type: "CHECK_PAID",
            });
        }
      });

      // this.props.students.map((student) => {
      //   let counter = 0;
      //   let totalMaps = 0;
      //   this.props.history.map((item, index) => {
      //     if (Number(student.lcf_id) === Number(item.lcf_id)) {
      //       if (item.attend_payment != "0.00") {
      //         counter++;
      //         console.log("counter", counter, student.lcf_id, item.lcf_id);
      //       }
      //       totalMaps++;
      //     }

      //     console.log("totalMaps", totalMaps, student.lcf_id, item.lcf_id);
      //     console.log("calc", counter / totalMaps, student.lcf_id, item.lcf_id);
      //   });
      //   if (counter / totalMaps < 0.8) {
      //     this.props.dispatch({
      //       type: "CHECK_TRIP",
      //       payload: {
      //         lcf_id: student.lcf_id,
      //         trip: "no",
      //       },
      //     });
      //     console.log(student.lcf_id, "no");
      //   } else {
      //     this.props.dispatch({
      //       type: "CHECK_TRIP",
      //       payload: {
      //         lcf_id: student.lcf_id,
      //         trip: "yes",
      //       },
      //     });
      //     console.log(student.lcf_id, "yes");
      //   }
      // });
     setTimeout(() => {
       window.location.reload();
     }, 2000);
  }
  render() {
    return (
      <div style={{ padding: "2%" }}>
        <center>
          <h1>Past Reports</h1>
        </center>
        <center>
        <Button
          onClick={(event) => this.didWePay(event)}
          variant="success"
          type="submit"
          style={{ width: "20%", margin: "2%" }}
        >
          Check if we paid the students
        </Button>
        {this.state.toggle === true ? (
          <div>Please wait while we calculate your information</div>
        ) : (
          <span></span>
        )}
        </center>
        <br />
        <div id="tooltip">
          <InfoIcon></InfoIcon>
          <span id="tooltiptext">
            Wanting to look at entries from a specific Pay Period? Click the{" "}
            <FilterListIcon></FilterListIcon>
            Filter List Icon and filter entries by Pay Day. Just select the date
            you want to look at!
          </span>
        </div>
        <MUITable
          data={this.props.history.map((item) => [
            item.lcf_id,
            item.first_name,
            item.last_name,

            moment.utc(item.pay_day).format("L"),
            moment.utc(item.date_submitted).format("L"),

            item.pass_class,
            item.gpa,
            item.clean_attend,
            item.detent_hours,
            item.act_or_job,
            item.passed_ua,
            item.current_service_hours,
            item.hw_rm_attended,
            item.comments,
            item.attend_payment,
            item.pif_donations,
            item.bonus_amount,
            item.bonus_comments,
            item.gpa_bonus,
            item.amt_to_savings,
            item.money_to_student,
            item.student_debt,
            item.student_debt_payment,
            item.student_debt_remaining,
            item.description,
            item.total,
            item.did_we_pay,
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
            "Attendance Payment",
            "PIF Donation Amount",
            "Bonus Amount",
            "Bonus Comments",
            "GPA Bonus",
            "Amount to Savings",
            "Money to Student",
            "Student Debt",
            "Student Debt Payment",
            "Student Debt Remaining",
            "Student Debt Description",
            "Total",
            "Student Paid?"
          ]}
          //title={"Past Reports"}
        />
        <br />
        <br />
        <br />
        <center>
          <h1>Trip Eligibility</h1>
          <Form.Control
            as="select"
            onChange={(event) => this.setState({ lcf_id: event.target.value })}
          >
            <option value="">Pick From Below </option>{" "}
            {this.props.students
              ? this.props.students.map((student) => (
                  <option key={student.lcf_id} value={student.lcf_id}>
                    {" "}
                    {student.first_name}&nbsp; {student.last_name}&nbsp;{" "}
                  </option>
                ))
              : ""}
          </Form.Control>
          <Form>
            <center>
              <Button
                onClick={(event) => this.checkTrip(event)}
                variant="success"
                type="submit"
                style={{ width: "20%", margin: "2%" }}
              >
                Check Trip Eligibility
              </Button>
            </center>
          </Form>
        </center>
        <br />
        <br />
        <br />
        <MUITable
          data={this.props.students.map((item) => [
            item.lcf_id,
            item.first_name,
            item.last_name,
            item.trip,
          ])}
          columns={["LCF ID", "First Name", "Last Name", "Eligable for a trip"]}
          //title={"Past Reports"}
        />
        <br />
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
  entries: state.students.studententriesadmin,
  calculations: state.calculations.calculations,
  history: state.history.history
});

export default withRouter(connect(mapStateToProps)(PastAdminReports));