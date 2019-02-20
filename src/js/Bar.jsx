import React, { Component } from "react";
import PropTypes from "prop-types";

import "../sass/Bar.scss";
import logo from "../images/generic-logo.png";

class Bar extends Component {
   constructor(props) {
      super(props);

      this.state = {};
   }

   _getBarContent(type) {
      if (type === "top") {
         return (
            <div className="logo">
               <img src={logo} alt="some-logo" />
            </div>
         );
      }
      return (
         <div className="copyright">
            {"© something something"}
         </div>
      );
   }

   render() {
      const CustomTag = this.props.type === "top" ? "header" : "footer";

      return (
         <CustomTag className={`Bar ${CustomTag}`}>
            {this._getBarContent(this.props.type)}
         </CustomTag>
      );
   }
}

Bar.propTypes = {
   type: PropTypes.oneOf(["top", "bottom"]).isRequired
};

export default Bar;
