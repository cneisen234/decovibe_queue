import React, {Component} from "react";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";


class MUITable extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: "GET_USERS",
    });
  }

  state = {
    //title: this.props.title,
    setResponsive: "vertical",
    setTableBodyHeight: "400px",
    setTableBodyMaxHeight: " ",
    options: {
      filter: true,
      filterType: "dropdown",
      responsive: "vertical",
      tableBodyHeight: "7400px",
      tableBodyMaxHeight: " ",
      rowsPerPage: 100,
      rowsPerPageOptions: [100, 500, 1000],
      selectableRows: false, //false means checkboxes are hidden, I created my own checkbox functionality so this is turned off
    },
  };

  render() {
    return (
      <React.Fragment>
        <MUIDataTable
          title={this.props.title}
          data={this.props.data}
          columns={this.props.columns}
          options={this.state.options}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(MUITable);