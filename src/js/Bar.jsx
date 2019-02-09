import React, { Component } from "react";
import PropTypes from "prop-types";

import "../sass/Bar.scss";
import logo from "../images/logo.png";

class Bar extends Component {
   constructor(props) {
      super(props);

      this.state = {};
   }

	_getBarContent(type) {
		if(type === 'top') {
			return (
				<div className="logo">
					<img src={logo} alt="even-logo" />
				</div>
			);
		}
		return (
			<div className="coypright">
				{'© 2017 Even Financial, Inc. - CONFIDENTIAL'}
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
   type: PropTypes.PropTypes.oneOf(["top", "bottom"]).isRequired
};

export default Bar;
