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
import Swal from "sweetalert2";
import Paper from "@material-ui/core/Paper";
import moment from "moment";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const YellowRadio = withStyles({
  root: {
    color: yellow[400],
    "&$checked": {
      color: yellow[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

//The purpose of this page is to update the student's entry this past pay period

class AdminMakeEntry extends Component {
  state = {
    lcf_id: "",
    pass_class: "",
    gpa: 0,
    absent: 0,
    tardy: 0,
    late: 0,
    truant: 0,
    clean_attend: 10,
    total_days: 10,
    detent_hours: "",
    act_or_job: "",
    passed_ua: "",
    current_service_hours: 0,
    hw_rm_attended: "",
    comments: "",
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
      });
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
    let url_array = document.location.href.split("/"); //get the url

    let id = url_array[url_array.length - 1]; //gets the id from the url

    this.props.entries.map((item, index) => {
      if (item.lcf_id === Number(id)) {
        console.log("HELLO", item);
        this.setState({
          lcf_id: item.lcf_id,
          pass_class: item.pass_class,
          gpa: item.gpa,
          absent: item.absent,
          tardy: item.tardy,
          late: item.late,
          clean_attend: item.clean_attend,
          detent_hours: item.detent_hours,
          act_or_job: item.act_or_job,
          passed_ua: item.passed_ua,
          current_service_hours: item.current_service_hours,
          hw_rm_attended: item.hw_rm_attended,
          comments: item.comments,
        });
      } else {
        console.log("FAIL", item.lcf_id);
        console.log(id);
      }
    });
  }

  handleChange = (event, fieldName) => {
    this.setState({ [fieldName]: event.target.value });
  };
  handleChangeGpa = (event, gpa) => {
    gpa = Number(gpa);
    this.setState({
      gpa,
    });
  };
  handleChangeAbsent = (event, absent) => {
    absent = Number(absent);
    this.setState({
      absent,
    });
  };
  handleChangeTardy = (event, tardy) => {
    tardy = Number(tardy);
    this.setState({
      tardy,
    });
  };
  handleChangeLate = (event, late) => {
    late = Number(late);
    this.setState({
      late,
    });
  };
  handleChangeTruant = (event, truant) => {
    truant = Number(truant);
    this.setState({
      truant,
    });
  };
  //handleChange for attendance
  handleChangeAttendance = (event, clean_attend) => {
    this.setState({
      clean_attend,
    });
  }; //end handleChange

  //Function for submiting info
  submitInfo = (event) => {
    event.preventDefault();

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
      after_school,
      act_or_job,
      passed_ua,
      current_service_hours,
      hw_rm_attended,
      comments,
    } = this.state;

    Swal.fire({
      title: "Please confirm details below",
      html: `1. LCF ID: ${lcf_id} </br>
      2. Passing classes: ${pass_class} </br>
      3. GPA: ${gpa} </br>
      4. Days punctual: ${clean_attend} </br>
      5. Detention hours: ${detent_hours} </br>
      6. Job: ${act_or_job} </br>
      7. Drug free: ${passed_ua} </br>
      8. service hours: ${current_service_hours} </br>
      9. homeroom attendence: ${hw_rm_attended} </br>
      10. comments: ${comments}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm my entry",
    }).then((result) => {
      if (result.value) {
        this.props.dispatch({
          type: "ADMIN_ENTRY",
          payload: {
            lcf_id: lcf_id,
            pass_class: pass_class,
            gpa: gpa,
            absent: absent,
            tardy: tardy,
            late: late,
            truant: truant,
            clean_attend: clean_attend,
            detent_hours: detent_hours,
            after_school: after_school,
            act_or_job: act_or_job,
            passed_ua: passed_ua,
            current_service_hours: current_service_hours,
            hw_rm_attended: hw_rm_attended,
            comments: comments,
          },
        });
        Swal.fire("Success!", "Your entry update has been logged.", "success");
        this.props.history.push("/totalstudententries");
        console.log("state is", this.state);
      }
    });
  };

  navToStudentEntries = () => {
    //goes to details page
    this.props.history.push("/totalstudententries");
  };

  render() {
    const inputProps = {
      max: 10,
      min: 0,
    };
    const marks = [
      {
        value: 0,
        label: "0",
      },
      // {
      //   value: 1,
      //   label: "1",
      // },
      // {
      //   value: 2,
      //   label: "2",
      // },
      // {
      //   value: 3,
      //   label: "3",
      // },
      // {
      //   value: 4,
      //   label: "4",
      // },
      // {
      //   value: 5,
      //   label: "5",
      // },
      // {
      //   value: 6,
      //   label: "6",
      // },
      // {
      //   value: 7,
      //   label: "7",
      // },
      // {
      //   value: 8,
      //   label: "8",
      // },
      // {
      //   value: 9,
      //   label: "9",
      // },
      {
        value: this.state.total_days,
        label: this.state.total_days,
      },
    ];
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

    return (
      <div>
        {this.props.user.role === "admin" && (
          <div className="navbuttonscontainer">
            <Button
              onClick={this.navToStudentEntries}
              style={{
                marginLeft: "40%",
                marginTop: 10,
              }}
              variant="contained"
              color="primary"
              className="button"
            >
              {" "}
              View Student Entries
            </Button>{" "}
          </div>
        )}

        <br />
        <h3 style={{ textAlign: "center" }}>
          This entry is for the week of: PAY PERIOD HERE
        </h3>
        <Paper elevation={5} style={{ padding: "5%", margin: "5%" }}>
          <form onSubmit={this.submitInfo}>
            <p>1. Student LCF ID:</p>
            <TextField
              style={{
                backgroundColor: "white",
                margin: "5px",
                width: "30%",
              }}
              variant="outlined"
              required
              fullWidth
              label="lcf_id"
              name="lcf_id"
              // sets value of input to local state
              value={this.state.lcf_id}
              type="text"
              inputProps={inputProps}
              maxLength={1000}
              onChange={(event) => this.handleChange(event, "lcf_id")} //onChange of input values set local state
            />
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                2. Are you passing all your classes?
              </FormLabel>
              <RadioGroup
                aria-label="pass_class"
                name="pass_class"
                value={this.state.pass_class}
                onChange={(event) => this.handleChange(event, "pass_class")}
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
            <p>3. What is your current GPA?</p>
            <Slider
              style={{
                width: "80%",
              }}
              required
              defaultValue={this.state.gpa}
              type="number"
              aria-labelledby="discrete-slider-custom"
              step={0.01}
              valueLabelDisplay="auto"
              max={4}
              min={0}
              label="GPA"
              name="GPA"
              value={this.state.gpa}
              onChange={this.handleChangeGpa}
              marks={marksGpa}
            />{" "}
            <span style={{ marginLeft: 20 }}>GPA: {this.state.gpa}</span>
            <p>
              4. How many school days were you punctual for this pay period?
              <br />
              (no tardies, no truancy, no lateness)
            </p>
            <Slider
              style={{
                width: "80%",
              }}
              required
              defaultValue={this.state.clean_attend}
              type="number"
              aria-labelledby="discrete-slider-custom"
              step={1}
              valueLabelDisplay="auto"
              max={10}
              min={0}
              label="attendance"
              name="attendance"
              value={this.state.clean_attend}
              onChange={this.handleChangeAttendance}
              marks={marks}
            />{" "}
            <span style={{ marginLeft: 20 }}>
              Attendance: {this.state.clean_attend}
            </span>
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "black" }}>
                5. Do you have detention hours at school?
              </FormLabel>
              <RadioGroup
                aria-label="detent_hours"
                name="detent_hours"
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
                6. Are you involved in any after school activity or job? <br />
                (At school or at Legacy)
              </FormLabel>
              <RadioGroup
                aria-label="after_school"
                name="after_school"
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
                7. Are you living a drug free life?
              </FormLabel>
              <RadioGroup
                aria-label="passed_ua"
                name="passed_ua"
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
              8. How many service hours did you do the past 2 weeks?
              <TextField
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
                9. Were you ontime for mandatory homerooms this pay period?
              </FormLabel>
              <RadioGroup
                aria-label="hw_rm_attended"
                name="hw_rm_attended"
                value={this.state.hw_rm_attended}
                onChange={(event) => this.handleChange(event, "hw_rm_attended")}
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
            </FormControl>{" "}
            <br /> <br />
            <p>10. Any comments you would like to leave this pay period?</p>
            <TextField
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
              onChange={(event) => this.handleChange(event, "comments")} //onChange of input values set local state
            />{" "}
            <br />
            <br />
            <center>
              <Button
                style={{ margin: "6%" }}
                variant="contained"
                color="secondary"
                className="button"
                onClick={() => {
                  this.props.history.push("/totalstudententries");
                }}
              >
                Cancel Update
              </Button>

              <Button
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
        <br />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  entries: state.students.studententriesadmin,
});

export default withRouter(connect(mapStateToProps)(AdminMakeEntry));
