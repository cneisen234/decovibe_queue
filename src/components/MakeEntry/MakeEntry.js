import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { green, yellow } from "@material-ui/core/colors";
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormControl,
  FormLabel,
  withStyles,
  Slider,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Swal from "sweetalert2";
import Paper from "@material-ui/core/Paper";
import "./MakeEntry.css";
import moment from "moment";

const GreenRadio = withStyles({
  // turns the radio button green
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  // turns the radio button yellow
  root: {
    color: yellow[400],
    "&$checked": {
      color: yellow[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

//The purpose of this page is to capture the student's activity for the past pay period
class MakeEntry extends Component {
  state = {
    //state info for entry form
    lcf_id: this.props.user.lcf_id,
    pass_class: "",
    gpa: 0,
    absent: 0,
    tardy: 0,
    late: 0,
    truant: 0,
    clean_attend: 10,
    total_days: 10,
    detent_hours: null,
    act_or_job: null,
    passed_ua: null,
    current_service_hours: 0,
    hw_rm_attended: null,
    comments: null,
    //error values used to conditionally render error toasts, default is false
    error: false,
    pay_day_error: false,
    dupeEntry: false,
    toggle: false,
  };

  componentWillMount() {
    //current date
    let date = moment();
    //preset previous_pay_day
    let previous_pay_day = moment("2020-09-21T00:00:00.000-05"); //midnight central time
    //preset current pay_day
    let pay_day = moment(previous_pay_day);
    let counter = 0;
    //this function defines the current pay period
    function getDate() {
      //if date is greater or equal to the current date, run the logic below
      if (date >= pay_day) {
        counter++;
        //define previous_pay_day to be the same as current pay_day
        previous_pay_day = pay_day;
        //define current pay_day to be pay_day plus 2 weeks
        pay_day = moment(previous_pay_day).add(2, "week");
        //call the function again.
        getDate();
      }
    }
    //call getDate
    getDate();
    if (counter === 3) {
       this.setState({
         clean_attend: 8,
         total_days: 8,
       })
      } else if (counter === 4) {
          this.setState({
            clean_attend: 9,
            total_days: 9,
          });
      } else if (counter === 5) {
          this.setState({
            clean_attend: 7,
            total_days: 7,
          });
      } else if (counter === 7) {
          this.setState({
            clean_attend: 8,
            total_days: 8,
          });
      } else if (counter === 8) {
         this.setState({
           clean_attend: 5,
           total_days: 5,
         });
      } else if (counter === 9) {
         this.setState({
           clean_attend: 9,
           total_days: 9,
         });
      } else if (counter === 11) {
         this.setState({
           clean_attend: 8,
           total_days: 8,
         });
      } else if (counter === 13) {
          this.setState({
            clean_attend: 5,
            total_days: 5,
          });
      } else if (counter === 14) {
         this.setState({
           clean_attend: 9,
           total_days: 9,
         });
      } else if (counter === 16) {
         this.setState({
           clean_attend: 9,
           total_days: 9,
         });
      } else if (counter === 18) {
         this.setState({
           clean_attend: 9,
           total_days: 9,
         });
      } else if (counter === 19) {
         this.setState({
           clean_attend: 3,
           total_days: 3,
         });
      }
    //formats previous_pay_day
    previous_pay_day = moment(previous_pay_day).format("MMMM Do YYYY");
    //formats current pay_day
    pay_day = moment(pay_day).format("MMMM Do YYYY");
  }

  componentDidMount() {
    //grabs student data from database
    this.props.dispatch({
      type: "GET_STUDENTS",
    });
    //fetch entries for admins
    this.props.dispatch({
      type: "FETCH_ENTRIES_FOR_ADMIN",
    });
  } //end componentDidMount

  //This function handles storing input values into state on change
  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  }; //end handleChange

  // handleChange for gpa
  handleChangeGpa = (event, gpa) => {
    gpa = Number(gpa);
    this.setState({
      gpa,
    });
  }; //end handleChangeGpa

  //handleChange for absent
  handleChangeAbsent = (event, absent) => {
    absent = Number(absent);
    this.setState({
      absent,
    });
  }; //end handleChangeAbsent

  //handleChange for tardy
  handleChangeTardy = (event, tardy) => {
    tardy = Number(tardy);

    this.setState({
      tardy,
    });
  }; //end handleChangeTardy

  //handleChange for late
  handleChangeLate = (event, late) => {
    late = Number(late);
    this.setState({
      late,
    });
  }; //end handleChangeLate

  //handleChange for truant
  handleChangeTruant = (event, truant) => {
    truant = Number(truant);
    this.setState({
      truant,
    });
  }; //end handleChangeTruant

  //handleChange for attendance
  handleChangeAttendance = (event) => {
    let { absent, tardy, late, truant, clean_attend } = this.state;

    this.setState({
      clean_attend: clean_attend - absent - tardy - late - truant,
      toggle: !this.state.toggle,
    });
  }; //end handleChange

  //this function sends user information to the server to store in the database
  submitInfo = (event) => {
    //prevents any default actions
    event.preventDefault();
    //grabs local state and defines it in a var of the same name
    const {
      pass_class,
      lcf_id,
      gpa,
      absent,
      tardy,
      late,
      truant,
      clean_attend,
      detent_hours,
      act_or_job,
      passed_ua,
      current_service_hours,
      hw_rm_attended,
      comments,
    } = this.state;
    //don't run function if any of these values below are null
    if (
      pass_class === null ||
      detent_hours === null ||
      act_or_job === null ||
      passed_ua === null ||
      current_service_hours === null ||
      current_service_hours === undefined ||
      current_service_hours === "" ||
      hw_rm_attended === null
    ) {
      //...if they are null set error state to true to conditionally render alert toast
      this.setState({
        error: true,
      });
      //...set it back to false after 5 secondss
      setTimeout(() => {
        this.setState({
          error: false,
        });
      }, 5000);
      //stop the function
      return;
    }

    //saves studentHistory from reducer to historyEntries
    let historyEntries = this.props.studentHistory;
    //current date
    let date = moment();
    //preset previous_pay_day
    let previous_pay_day = moment("2020-08-10T00:00:00.000-05");
    //preset pay_day
    let pay_day = moment(previous_pay_day);

    //function to set pay_day and previous_pay_day to the current pay period
    function getDate() {
      //if date is greater or equal to the current date, run the logic below
      if (date >= pay_day) {
        //define previous_pay_day to be the same as current pay_day
        previous_pay_day = pay_day;
        //define current pay_day to be pay_day plus 2 weeks
        pay_day = moment(previous_pay_day).add(2, "week");
        //call the function again.
        getDate();
      }
    }
    //call getDate
    getDate();
    //formats previous_pay_day
    previous_pay_day = moment(previous_pay_day).format("MMMM Do YYYY");
    //formats current pay_day
    pay_day = moment(pay_day).format("MMMM Do YYYY hh:mm:ss");
    console.log("pay_day", pay_day)
    console.log("previous_pay_day", previous_pay_day)
    //loops through historyEntries
    for (let history of historyEntries) {
      //formats history_pay_day
      let history_pay_day = moment
        .utc(history.pay_day)
        .format("MMMM Do YYYY hh:mm:ss"); //trying to add time
      //checks to see if a student has made an entry for that pay period
      if (history_pay_day === pay_day) {
        //sets state to true which conditionally renders an error
        this.setState({
          pay_day_error: true,
        });
        //...turns it back to false after 5 seconds
        setTimeout(() => {
          this.setState({
            pay_day_error: false,
          });
        }, 5000);
        return;
      } //end if statement
    }

    //begin sweetAlerts
    Swal.fire({
      title: "Please confirm details below",
      html: `1. Passing classes: ${pass_class} </br>
      2. GPA: ${gpa} </br>
      3a. Days absent: ${absent} </br>
      3b. Days tardy: ${tardy} </br>
      3c. Days late ${late} </br>
      3d. Days truant ${truant} </br>
      3e. Days punctual: ${clean_attend} </br>
      4. Detention hours: ${detent_hours} </br>
      5. Job or after school activities: ${act_or_job} </br>
      6. Drug free: ${passed_ua} </br>
      7. service hours: ${current_service_hours} </br>
      8. homeroom attendence: ${hw_rm_attended} </br>
      9. comments: ${comments}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#5cb85c",
      cancelButtonColor: "#fcb70a",
      confirmButtonText: "Confirm my entry",
    }).then((result) => {
      //end sweetAlerts

      //on confirm run the dispatch to send makeEntry info over to redux sagas
      if (result.value) {
        this.props.dispatch({
          type: "ADD_ENTRY",
          payload: {
            pass_class: pass_class,
            lcf_id: lcf_id,
            gpa: gpa,
            absent: absent,
            tardy: tardy,
            late: late,
            truant: truant,
            clean_attend: clean_attend,
            detent_hours: detent_hours,
            act_or_job: act_or_job,
            passed_ua: passed_ua,
            current_service_hours: current_service_hours,
            hw_rm_attended: hw_rm_attended,
            comments: comments,
          },
        });
        //begin sweetAlerts
        Swal.fire("Success!", "Your entry has been logged.", "success"); //end sweetAlerts
        //pushes user back to homepage
        this.props.history.push("/home");
      }
    });
  }; //ends SubmitInfo

  render() {
    // sets min and max for service hours text box
    const inputProps = {
      max: 10,
      min: 0,
    };
    //defines marks on sliders, displays value below each spot on each slider
    const marks = [
      {
        value: 0,
        label: "0",
      },
      //   {
      //     value: 1,
      //     label: "1",
      //   },
      //   {
      //     value: 2,
      //     label: "2",
      //   },
      //   {
      //     value: 3,
      //     label: "3",
      //   },
      //   {
      //     value: 4,
      //     label: "4",
      //   },
      //   {
      //     value: 5,
      //     label: "5",
      //   },
      //   {
      //     value: 6,
      //     label: "6",
      //   },
      //   {
      //     value: 7,
      //     label: "7",
      //   },
      //   {
      //     value: 8,
      //     label: "8",
      //   },
      //   {
      //     value: 9,
      //     label: "9",
      //   },
      {
        value: this.state.total_days,
        label: this.state.total_days,
      },
    ];
    //same as marks but specific for the gpa slider
    const marksGpa = [
      {
        value: 0,
        label: "0",
      },
      {
        value: 0.5,
        label: "0.5",
      },
      {
        value: 1,
        label: "1",
      },
      {
        value: 1.5,
        label: "1.5",
      },
      {
        value: 2,
        label: "2",
      },
      {
        value: 2.5,
        label: "2.5",
      },
      {
        value: 3,
        label: "3",
      },
      {
        value: 3.5,
        label: "3.5",
      },
      {
        value: 4,
        label: "4",
      },
    ];
    //saves entries from reducer to var of same name
    let { entries } = this.props;
    //current date
    let date = moment();
    //preset previous_pay_day
    let previous_pay_day = moment("2020-09-21T00:00:00.000-05"); //midnight central time
    //preset current pay_day
    let pay_day = moment(previous_pay_day);
    let counter = 0;
    //this function defines the current pay period
    function getDate() {
      //if date is greater or equal to the current date, run the logic below
      if (date >= pay_day) {
        counter++;
        //define previous_pay_day to be the same as current pay_day
        previous_pay_day = pay_day;
        //define current pay_day to be pay_day plus 2 weeks
        pay_day = moment(previous_pay_day).add(2, "week");
        //call the function again.
        getDate();
      }
    }
    //call getDate
    getDate();
    //formats previous_pay_day
    previous_pay_day = moment(previous_pay_day).format("MMMM Do YYYY");
    //formats current pay_day
    pay_day = moment(pay_day).format("MMMM Do YYYY");
    //saves students from reducer to studentList
    const studentList = this.props.students;

    for (let student of studentList) {
      //checks lcf_id of student and if the student is active
      if (
        this.props.user.lcf_id === student.lcf_id &&
        student.inactive === "yes"
      ) {
        // if the student is inactive they can not make an entry, this message appears instead when they click on make entry
        return (
          <div>
            <Paper elevation={5} style={{ margin: "5%", padding: "5%" }}>
              <center>
                <h2>
                  Sorry, you cannot make an entry at this moment. Your account
                  is currently inactive, please contact the admin for further
                  details.
                </h2>
              </center>
              <center>
                <h2>Thank you!</h2>
              </center>
            </Paper>
          </div>
        );
      }
    }
    //loops through entries
    for (let entry of entries) {
      //makes sure pay_day is a Date value
      entry.pay_day = new Date(entry.pay_day);
      //makes sure previous_pay_day is a Date value
      entry.previous_pay_day = new Date(entry.previous_pay_day);
      //checks lcf_id of student and if they've already made an entry
      if (
        this.props.user.lcf_id === entry.lcf_id &&
        (entry.pay_day > date || entry.previous_pay_day <= date)
      ) {
        //...if they did make an entry,
        //this notification appears rather then the entry forum
        //when the student clicks on make entry
        return (
          <div>
            <Paper elevation={5} style={{ margin: "5%", padding: "5%" }}>
              <center>
                <h2>
                  Entry already submitted for this pay period, please check back
                  next pay period
                </h2>
              </center>
              <center>
                <h2>Thank you!</h2>
              </center>
            </Paper>
          </div>
        );
      }
    }

    return (
      <div>
        <br />
        {/* toast that appears on error, shows up when all required fields are not filled in */}
        {this.state.error === true && (
          <Alert className="error" style={{}} severity="error">
            Please fill out all of the required fields
          </Alert>
        )}
        <br />
        {/* toast that appears when student tries to make an entry when an entry has alreadt been made */}
        {this.state.pay_day_error === true && (
          <Alert className="error" style={{}} severity="error">
            Sorry, you already have an entry on record for this pay period, your
            entry has not been saved successfully!
          </Alert>
        )}
        {/* shows current pay period. payDay() function updates to current dates */}
        <h3 style={{ textAlign: "center", margin: "2%" }}>
          This entry is for the week of: {previous_pay_day} - {pay_day}
        </h3>
        <Paper
          elevation={5}
          style={{
            padding: "5%",
            marginLeft: "5%",
            marginRight: "5%",
            marginBottom: "5%",
          }}
        >
          {/* start form for make entry */}
          <form onSubmit={this.submitInfo}>
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                1. Are you passing all your classes?
              </FormLabel>
              <RadioGroup
                required
                aria-label="pass_class"
                name="pass_class"
                // sets the value of the input to the value of state
                value={this.state.pass_class}
                // onChange run handleChange function to update coorasponding state
                onChange={(event) => this.handleChange(event, "pass_class")}
              >
                <FormControlLabel
                  value="Yes"
                  //calls and renders the green radio button
                  control={<GreenRadio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  //calls and renders the yellow radio button
                  control={<YellowRadio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <p>2. What is your current GPA?</p>
            <Slider
              //sets width of slider to 80% of the screen
              style={{
                width: "80%",
              }}
              required
              // sets the default value of the slider to the value of state
              defaultValue={this.state.gpa}
              // requires a number
              type="number"
              aria-labelledby="discrete-slider-custom"
              // allows decimals values of up to 0.01
              step={0.01}
              valueLabelDisplay="auto"
              // max value is 4, gpa max is 4.0 and can't go higher
              max={4}
              // min value is 0, gpa min value is 0 and can't go lower
              min={0}
              label="GPA"
              name="GPA"
              // sets the value of the slider to the value of state
              value={this.state.gpa}
              // onChange run handleChange function to update coorasponding state
              onChange={this.handleChangeGpa}
              // sets the mark values for gpa below the slider.
              marks={marksGpa}
            />{" "}
            <span style={{ marginLeft: 20 }}>GPA: {this.state.gpa}</span>
            {this.state.toggle === false ? (
              <>
                <p>
                  3a. How many days were you absent from school this pay period?
                </p>
                <Slider
                  style={{
                    width: "80%",
                  }}
                  required
                  // sets the default value of the input to the value of state
                  defaultValue={this.state.absent}
                  type="number"
                  aria-labelledby="discrete-slider-custom"
                  step={1} //days are a whole number (no decimals)
                  valueLabelDisplay="auto"
                  max={this.state.total_days} //max of how many school days in that week, this varies by each week.
                  min={0} //starts at 0 since you can't attend a negative amount of days
                  label="absent"
                  name="absent"
                  // sets the value of the input to the value of state
                  value={this.state.absent}
                  // onChange run handleChange function to update coorasponding state
                  onChange={this.handleChangeAbsent}
                  marks={marks} // sets the mark values below the slider.
                />
                <span style={{ marginLeft: 20 }}>
                  Days absent: {this.state.absent}
                </span>
                <p>3b. How many school days were you tardy this pay period?</p>
                <Slider
                  style={{
                    width: "80%",
                  }}
                  required
                  // sets the default value of the input to the value of state
                  defaultValue={this.state.tardy}
                  type="number"
                  aria-labelledby="discrete-slider-custom"
                  step={1} //days are a whole number (no decimals)
                  valueLabelDisplay="auto"
                  max={this.state.total_days} //max of how many school days in that week, this varies by each week.
                  min={0} //starts at 0 since you can't attend a negative amount of days
                  label="tardy"
                  name="tardy"
                  // sets the value of the input to the value of state
                  value={this.state.tardy}
                  // onChange run handleChange function to update coorasponding state
                  onChange={this.handleChangeTardy}
                  marks={marks} // sets the mark values below the slider.
                />{" "}
                <span style={{ marginLeft: 20 }}>
                  Days tardy: {this.state.tardy}
                </span>
                <p>3c. How many school days were you late this pay period?</p>
                <Slider
                  style={{
                    width: "80%",
                  }}
                  required
                  // sets the default value of the input to the value of state
                  defaultValue={this.state.late}
                  type="number"
                  aria-labelledby="discrete-slider-custom"
                  step={1} //days are a whole number (no decimals)
                  valueLabelDisplay="auto"
                  max={this.state.total_days} //max of how many school days in that week, this varies by each week.
                  min={0} //starts at 0 since you can't attend a negative amount of days
                  label="late"
                  name="late"
                  // sets the value of the input to the value of state
                  value={this.state.late}
                  // onChange run handleChange function to update coorasponding state
                  onChange={this.handleChangeLate}
                  marks={marks} // sets the mark values below the slider.
                />{" "}
                <span style={{ marginLeft: 20 }}>
                  Days late: {this.state.late}
                </span>
                <p>3d. How many school days were you truant this pay period?</p>
                <Slider
                  style={{
                    width: "80%",
                  }}
                  required
                  // sets the default value of the input to the value of state
                  defaultValue={this.state.truant}
                  type="number"
                  aria-labelledby="discrete-slider-custom"
                  step={1} //days are a whole number (no decimals)
                  valueLabelDisplay="auto"
                  max={this.state.total_days} //max of how many school days in that week, this varies by each week.
                  min={0} //starts at 0 since you can't attend a negative amount of days
                  label="truant"
                  name="truant"
                  // sets the value of the input to the value of state
                  value={this.state.truant}
                  // onChange run handleChange function to update coorasponding state
                  onChange={this.handleChangeTruant}
                  marks={marks} // sets the mark values below the slider.
                />{" "}
                <span style={{ marginLeft: 20 }}>
                  Days truant: {this.state.truant}
                </span>
                <br />
                <Button //button that, once clicked, calculates total attendance
                  style={{
                    marginTop: "3%",
                    marginLeft: "5%",
                    marginRight: "5%",
                    backgroundColor: "green",
                    color: "white",
                  }}
                  variant="contained"
                  color="primary"
                  className="button"
                  onClick={this.handleChangeAttendance}
                >
                  Calculate Attendance
                </Button>
              </>
            ) : (
              <>
                <p>Total Attendance</p>
                <Slider
                  disabled
                  style={{
                    width: "80%",
                  }}
                  required
                  defaultValue={this.state.clean_attend}
                  type="number"
                  aria-labelledby="discrete-slider-custom"
                  step={1} //days are a whole number (no decimals)
                  valueLabelDisplay="auto"
                  max={this.state.total_days} //total number of school days, this can vary
                  min={0} //starts at 0 since you can't attend a negative amount of days
                  label="attendance"
                  name="attendance"
                  value={this.state.clean_attend}
                  marks={marks} // sets the mark values below the slider.
                />{" "}
                <span style={{ marginLeft: 20 }}>
                  Attendance: {this.state.clean_attend}
                </span>
              </>
            )}
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                4. Do you have detention hours at school?
              </FormLabel>
              <RadioGroup //Yes or No answer (i.e. two options)
                aria-label="detent_hours"
                name="detent_hours"
                // sets the value of the input to the value of state
                value={this.state.detent_hours}
                onChange={(event) => this.handleChange(event, "detent_hours")}
              >
                <FormControlLabel
                  value="No"
                  control={<GreenRadio />}
                  label="No"
                />
                <FormControlLabel
                  value="Yes"
                  control={<YellowRadio />}
                  label="Yes"
                />
              </RadioGroup>
            </FormControl>{" "}
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                5. Are you involved in any after school activity or job? <br />
                (At school or at Legacy)
              </FormLabel>
              <RadioGroup //Yes or No answer (i.e. two options)
                aria-label="act_or_job"
                name="act_or_job"
                // sets the value of the input to the value of state
                value={this.state.act_or_job}
                onChange={(event) => this.handleChange(event, "act_or_job")}
              >
                <FormControlLabel
                  value="Yes"
                  control={<GreenRadio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<YellowRadio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                6. Are you living a drug free life?
              </FormLabel>
              <RadioGroup //Yes or No answer (i.e. two options)
                aria-label="passed_ua"
                name="passed_ua"
                // sets the value of the input to the value of state
                value={this.state.passed_ua}
                onChange={(event) => this.handleChange(event, "passed_ua")}
              >
                <FormControlLabel
                  value="Yes"
                  control={<GreenRadio />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<YellowRadio />}
                  label="No"
                />
              </RadioGroup>
            </FormControl>
            <br />
            <p>
              7. How many service hours did you do the past 2 weeks?
              <TextField //takes in a number (can be 0)
                style={{
                  backgroundColor: "white",
                  margin: "5px",
                  width: "130px",
                  verticalAlign: "middle",
                }}
                variant="outlined"
                required
                fullWidth
                label="service hours"
                name="service hours"
                // sets value of input to local state
                value={this.state.current_service_hours}
                type="number"
                inputProps={inputProps}
                maxLength={1000}
                onChange={(event) =>
                  this.handleChange(event, "current_service_hours")
                } //onChange of input values set local state
              />
            </p>
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                8. Were you ontime for mandatory homerooms this pay period?
              </FormLabel>
              <RadioGroup //Yes or No answer (i.e. two possible options)
                aria-label="hw_rm_attended"
                name="hw_rm_attended"
                // sets the value of the input to the value of state
                value={this.state.hw_rm_attended}
                //onChange of input values set local state
                onChange={(event) => this.handleChange(event, "hw_rm_attended")}
              >
                <FormControlLabel
                  value="Yes"
                  control={<GreenRadio />} //colors button
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<YellowRadio />} //colors button
                  label="No"
                />
              </RadioGroup>
            </FormControl>{" "}
            <br /> <br />
            <p>9. Any comments you would like to leave this pay period?</p>
            <TextField //box for student to enter in text
              style={{
                backgroundColor: "white",
                margin: "5px",
                width: "100%",
              }}
              //per material UI changes textfield to act like a textarea tag
              multiline
              //input field takes up for rows by defaults
              rows={4}
              //...will expand up to 8 rows
              rowsMax={8}
              variant="outlined"
              fullWidth
              label="Write comments here"
              name="comments"
              // sets value of input to local state
              value={this.state.comments}
              type="text"
              maxLength={1000}
              //onChange of input values set local state
              onChange={(event) => this.handleChange(event, "comments")} //onChange of input values set local state
            />{" "}
            <center>
              <Button //button that cancels current entry, i.e. do not submit anything to database
                style={{
                  marginTop: "3%",
                  marginLeft: "5%",
                  marginRight: "5%",
                  backgroundColor: "#b89c09",
                  color: "white",
                }}
                variant="contained"
                className="button"
                onClick={() => {
                  this.props.history.push("/home"); //push student back to home page
                }}
              >
                Cancel Entry
              </Button>

              <Button //button that, one clicked, submits the entry to the database
                style={{
                  //note that it only goes through if it passes all validation
                  marginTop: "3%",
                  marginLeft: "5%",
                  marginRight: "5%",
                  backgroundColor: "green",
                  color: "white",
                }}
                variant="contained"
                type="submit"
                color="primary"
                className="button"
              >
                Submit Entry
              </Button>
            </center>
          </form>
        </Paper>
        <br />{" "}
        {/*Add a little buffer on the bottom of page (prevent cutoff on mobile) */}
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  entries: state.students.studententriesadmin,
  students: state.students.studentlist,
  studentHistory: state.studentHistory.studentHistoryReducer,
});

export default withRouter(connect(mapStateToProps)(MakeEntry));
