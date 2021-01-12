import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { Grid } from "@material-ui/core";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import LoopIcon from "@material-ui/icons/Loop";
import EmailIcon from "@material-ui/icons/Email";
import ReplyIcon from "@material-ui/icons/Reply";
import HistoryIcon from "@material-ui/icons/History";
import EditIcon from "@material-ui/icons/Edit";

class Nav extends Component {

  state = {
    toggle: false,
    //changes colors of navbar when toggled, used to identify which queue we are in
    backgroundcolor: "#000080",
    backgroundcolorclass: "nav-link",
  };

  componentDidMount() {
    //grab counts of everything
    this.props.dispatch({
      type: "GET_ITEM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_CUSTOM_ITEM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_CONFIRM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_RESPOND_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_RESPOND_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_PROGRESS_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_CONFIRM_LIST_COUNT",
    });
    this.props.dispatch({
      type: "GET_COMPLETE_LIST_COUNT",
    });
  }

  render() {
    return (
      <Grid container style={{}}>
        <Grid
          item
          xs={12}
          sm={12}
          md={2}
          style={{ backgroundColor: "white", width: "15%", float: "left" }}
        >
          {/*HTW logo at top*/}
          <img
            src="https://cdn11.bigcommerce.com/s-et4qthkygq/images/stencil/177x60/htwlogo_web_1573140308__59565.original.png"
            alt="HTW logo"
          ></img>
        </Grid>

        {/* Show these links if they are logged in*/}
        {this.state.toggle === false ? (
          <>
            {this.props.user.id ? (
              <>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={7}
                  style={{
                    backgroundColor: this.state.backgroundcolor,
                    width: "15%",
                    float: "left",
                  }}
                >
                  <Link className={this.state.backgroundcolorclass} to="/home">
                    <EditIcon></EditIcon>New{" "}
                    {/*used to display the count of all items in the new queue*/}
                    {`(${
                      this.props.itemlistcount[0] &&
                      this.props.itemlistcount[0].count
                    })`}
                  </Link>
                  <Link
                    className={this.state.backgroundcolorclass}
                    to="/progress"
                  >
                    <FormatListBulletedIcon></FormatListBulletedIcon>
                    In Progress{" "}
                    {`(${
                      this.props.progresslistcount[0] &&
                      this.props.progresslistcount[0].count
                    })`}
                  </Link>
                  <Link
                    className={this.state.backgroundcolorclass}
                    to="/complete"
                  >
                    <PlaylistAddCheckIcon></PlaylistAddCheckIcon>
                    Complete{" "}
                    {`(${
                      this.props.completelistcount[0] &&
                      this.props.completelistcount[0].count
                    })`}
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={3}
                  style={{
                    backgroundColor: this.state.backgroundcolor,
                    width: "30%",
                    float: "left",
                  }}
                >
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    style={{
                      backgroundColor: this.state.backgroundcolor,
                      width: "50%",
                      float: "left",
                    }}
                  >
                    <div
                      style={{ float: "right" }}
                      onClick={(event) => {
                        event.preventDefault();
                        this.setState({
                          //toggles queue and nav color
                          toggle: !this.state.toggle,
                          backgroundcolor: "#8B008B",
                          backgroundcolorclass: "nav-link2",
                        });
                        this.props.dispatch({
                          type: "GET_ITEM_LIST",
                        });
                        this.props.dispatch({
                          type: "GET_ITEM_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_RESPOND_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_CONFIRM_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_CUSTOM_ITEM_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_PROGRESS_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_COMPLETE_LIST_COUNT",
                        });
                      }}
                    >
                      <Link
                        className={this.state.backgroundcolorclass}
                        to="/newcustom"
                      >
                        <LoopIcon></LoopIcon>
                        Switch Queues{" "}
                      </Link>
                    </div>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    style={{
                      backgroundColor: this.state.backgroundcolor,
                      width: "50%",
                      float: "left",
                    }}
                  >
                    <LogOutButton
                      style={{
                        float: "left",
                        backgroundColor: this.state.backgroundcolor,
                      }}
                      className={this.state.backgroundcolorclass}
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid
                item
                xs={12}
                sm={12}
                md={10}
                style={{
                  backgroundColor: this.state.backgroundcolor,
                  width: "15%",
                  float: "left",
                }}
              >
                <span></span>
              </Grid>
            )}
          </>
        ) : (
          <>
            {this.props.user.id ? (
              <>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={7}
                  style={{
                    backgroundColor: this.state.backgroundcolor,
                    width: "15%",
                    float: "left",
                  }}
                >
                  <Link
                    className={this.state.backgroundcolorclass}
                    to="/newcustom"
                  >
                    <EditIcon></EditIcon>New{" "}
                    {`(${
                      this.props.customitemlistcount[0] &&
                      this.props.customitemlistcount[0].count
                    })`}
                  </Link>
                  <Link
                    className={this.state.backgroundcolorclass}
                    to="/SentCustomer"
                  >
                    <EmailIcon></EmailIcon>
                    Sent to Customer{" "}
                    {`(${
                      this.props.confirmlistcount[0] &&
                      this.props.confirmlistcount[0].count
                    })`}
                  </Link>
                  <Link
                    className={this.state.backgroundcolorclass}
                    to="/Response"
                  >
                    <ReplyIcon></ReplyIcon>
                    Customer response{" "}
                    {`(${
                      this.props.respondlistcount[0] &&
                      this.props.respondlistcount[0].count
                    })`}
                  </Link>
                  <Link
                    className={this.state.backgroundcolorclass}
                    to="/complete"
                  >
                    <PlaylistAddCheckIcon></PlaylistAddCheckIcon>
                    Complete{" "}
                    {`(${
                      this.props.completelistcount[0] &&
                      this.props.completelistcount[0].count
                    })`}
                  </Link>
                  <Link
                    className={this.state.backgroundcolorclass}
                    to="/History"
                  >
                    <HistoryIcon></HistoryIcon>
                    History{" "}
                  </Link>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={3}
                  style={{
                    backgroundColor: this.state.backgroundcolor,
                    width: "30%",
                    float: "left",
                  }}
                >
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    style={{
                      backgroundColor: this.state.backgroundcolor,
                      width: "50%",
                      float: "left",
                    }}
                  >
                    <div
                      style={{ float: "right", margin: "0px", padding: "0px" }}
                      onClick={(event) => {
                        event.preventDefault();
                        this.setState({
                          toggle: !this.state.toggle,
                          backgroundcolor: "#000080",
                          backgroundcolorclass: "nav-link",
                        });
                        this.props.dispatch({
                          type: "GET_ITEM_LIST",
                        });
                        this.props.dispatch({
                          type: "GET_ITEM_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_RESPOND_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_CONFIRM_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_CUSTOM_ITEM_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_PROGRESS_LIST_COUNT",
                        });
                        this.props.dispatch({
                          type: "GET_COMPLETE_LIST_COUNT",
                        });
                      }}
                    >
                      <Link
                        className={this.state.backgroundcolorclass}
                        to="/home"
                      >
                        <LoopIcon></LoopIcon>
                        Switch Queues{" "}
                      </Link>
                    </div>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    style={{
                      backgroundColor: this.state.backgroundcolor,
                      width: "50%",
                      float: "left",
                    }}
                  >
                    <LogOutButton
                      style={{ float: "left" }}
                      className={this.state.backgroundcolorclass}
                    />
                  </Grid>
                </Grid>
              </>
            ) : (
              <Grid
                item
                xs={12}
                sm={12}
                md={10}
                style={{
                  backgroundColor: this.state.backgroundcolor,
                  width: "15%",
                  float: "left",
                }}
              >
                <span></span>
              </Grid>
            )}
          </>
        )}

        <>
        </>
      </Grid>
    );
  }
}
//grab the count of all of the queues
const mapStateToProps = (state) => ({
  user: state.user,
  itemlistcount: state.item.itemlistcount,
  customitemlistcount: state.item.customitemlistcount,
  progresslistcount: state.item.progresslistcount,
  confirmlistcount: state.item.confirmlistcount,
  respondlistcount: state.item.respondlistcount,
  completelistcount: state.item.completelistcount,
});

export default connect(mapStateToProps)(Nav);
