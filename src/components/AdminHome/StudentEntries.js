import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";
import MUITable from "../MUITable/MUITable";
import { withRouter } from "react-router";
import EditIcon from '@material-ui/icons/Edit';
import moment from 'moment';


class StudentEntries extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_STUDENTS",
    });

    this.props.dispatch({
      type: "GET_ADMIN",
    });

    this.props.dispatch({
      type: "FETCH_ENTRIES_FOR_ADMIN",
    });
  }

  //does dispatch to run calculations and then GET calculations to display on table
  //(see calculationsSaga.js)
  runReport() {
    this.props.dispatch({ type: "FETCH_CALCULATIONS" });
  }

  redirectPage() {
    if(this.props.redirect.redirect === true){
      return <Redirect to='/opentransactions'/>
    }
  }
  

  render() { //MUI tables for columns for the table
    const columns = [
      {
        name: "Edit",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex, rowIndex) => {
            return (
              <Button
                variant="warning"
                onClick={() => {
                  const studentsArray = this.filterStudentArray(
                    this.props.entries
                  );
                  const student = studentsArray[dataIndex];
                  console.log(student);
                  /* a possible refactor:
                    1. Create a function that returns only the filtered students, but its still an array of objects
                    2. Then you pass into the MUITable the result of a function that takes the filtered list and makes
                      an array in the expected format
                    3. then in THIS function use the first array, not the second mapped array. Thus student.id would work
                      instead of student[5]
                  */
                  console.log(`entry id should be: ${student.lcf_id}`);
                  //alert(`Clicked "Edit" for row ${rowIndex} with dataIndex of ${dataIndex}`)

                  this.props.history.push({
                    pathname: `/adminentryupdate/${student.lcf_id}`,
                    // state: {lcf_id: student.lcf_id}
                    // pathname:`/updatestudent/${dataIndex}`,
                    // state: {id: dataIndex}
                  }); //this pushes admin to edit page for select student
                  // this.props.dispatch({
                  //   type: "EDIT_STUDENT",
                  //   payload: {
                  //     lcf_id: student.lcf_id,
                  //   },
                  // });

                  this.props.dispatch({
                    type: "GET_STUDENT_FOR_EDIT",
                    payload: student.lcf_id,
                  });
                }}
              >
                <EditIcon></EditIcon>
              </Button>
            );
          },
        },
      },
      {
        name: "Entry ID",
        options: {
          filter: true,
        },
      },
      {
        name: "First Name",
        options: {
          filter: true,
        },
      },
      {
        name: "Last Name",
        options: {
          filter: false,
        },
      },
      {
        name: "ID",
        options: {
          filter: true,
        },
      },
      {
        name: "Grade",
        options: {
          filter: true,
          sort: false,
        },
      },
      {
        name: "School Name",
        options: {
          filter: true,
        },
      },
      {
        name: "Passing Classes",
        options: {
          filter: true,
        },
      },
      {
        name: "GPA",
        options: {
          filter: true,
        },
      },
      {
        name: "Days Attended",
        options: {
          filter: true,
        },
      },
      {
        name: "Detention",
        options: {
          filter: true,
        },
      },
      {
        name: "Activities or Job",
        options: {
          filter: true,
        },
      },
      {
        name: "Drug Free",
        options: {
          filter: true,
        },
      },
      {
        name: "Service Hours",
        options: {
          filter: true,
        },
      },
      {
        name: "Attended Homeroom",
        options: {
          filter: true,
        },
      },
      {
        name: "Comments",
        options: {
          filter: true,
        },
      },
    ];

    //The calculations below show the next pay day 
    let date = moment();
    let previous_pay_day = moment("2020-08-10T00:00:00.000-05")
    let pay_day = moment(previous_pay_day)
  
    //beginning of getDate
      function getDate() {
        if (date >= pay_day) {
          previous_pay_day = pay_day;
          pay_day = moment(previous_pay_day).add(2, "week");
          getDate();
        }
      }//End of getDate
      getDate();

      previous_pay_day = moment(previous_pay_day).format(
        "MMMM Do YYYY"
      );
      pay_day = moment(pay_day).format("MMMM Do YYYY");
    return (
      <div><br/>
         <center><h1 >Current Entries</h1></center>
         <Button
          style={{margin:'1%'}}
          variant='success'
          onClick={(event) => this.runReport(event)}
        >
          Run Report
        </Button> 
        {console.log(this.props.redirect)}
        {this.redirectPage()}
        {/*PLEASE NOTE: instead of start date, we want to show latest activity on this table */}
        {/*This will be tied to whenever a student logs in, it will do a put on that column to show thier latest login */}

        {/*Blaine: one option, get rid of filter and map and handle in redux */}
        {/*Do map in redux and store the data for the table in redux */}
        <div style={{paddingRight:'2%', paddingLeft:'2%', paddingBottom:'6%'}}>
        <MUITable
          data={this.getStudentArray(this.props.entries)}
          columns={columns}
          title={`Entries for Current Pay Period: ${previous_pay_day} - ${pay_day}`}
          
        />
        </div>
        <br/>
        <br/>
       
      </div>
    );
  }

  // this IS A SELECTOR: it takes some state, and it
  // returns some derived state. In other words, if you
  // have students, you can always calculate the array
  // that MUI needs from there.
  getStudentArray = (entries) => {
    const studentsArray = entries.map(
      (entry, index) => [
        entry.id,
        entry.first_name,
        entry.last_name,
        entry.lcf_id,
        // moment(entry.pay_day).format("MMMM Do YYYY"),
        // moment(entry.date_submitted).format("MMMM Do YYYY"),
        entry.grade,
        entry.school_attend,
        entry.pass_class,
        entry.gpa,
        entry.clean_attend,
        entry.detent_hours,
        entry.act_or_job,
        entry.passed_ua,
        entry.current_service_hours,
        entry.hw_rm_attended,
        entry.comments,
      ]
    );
    return studentsArray;
  };
}

const mapStateToProps = (state) => ({
  user: state.user,
  students: state.students.studentlist,
  redirect: state.redirect,
  entries: state.students.studententriesadmin,
});

export default withRouter(connect(mapStateToProps)(StudentEntries));
