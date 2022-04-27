import React, { Component } from "react";
import './Footer.css'

class Footer extends Component {
  render() {
    let thisDate = new Date();
    let thisYear = thisDate.getFullYear();
    const copyright = "\u00A9";
    return (
      <footer className="App-footer">
        <p>
          {copyright}  Heat Transfer Warehouse  {thisYear}
        </p>
      </footer>
    ); // end return
  } // end render
} // end class Footer

export default Footer;
