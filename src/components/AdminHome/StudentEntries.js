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
      type: "GET_ADMIN",
    });
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
        {/*PLEASE NOTE: instead of start date, we want to show latest activity on this table */}
        {/*This will be tied to whenever a student logs in, it will do a put on that column to show thier latest login */}

        {/*Blaine: one option, get rid of filter and map and handle in redux */}
        {/*Do map in redux and store the data for the table in redux */}
        <div style={{paddingRight:'2%', paddingLeft:'2%', paddingBottom:'6%'}}>
        </div>
        <br/>
        <br/>
       
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps)(StudentEntries));
