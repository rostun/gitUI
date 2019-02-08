import React, { Component } from "react";
import PropTypes from "prop-types";

import "../sass/Bar.scss";

class Bar extends Component {
   constructor(props) {
      super(props);

      this.state = {
      };
   }

   componentDidMount() {
   }

   componentDidUpdate(prevProps) {
		if (this.props.type !== prevProps.type) {
			//this.props.type
      }
   }

   render() {
		const CustomTag = this.props.type === 'top' ? 'header' : 'footer';

      return (
			<CustomTag className={CustomTag}>
				{CustomTag}
			</CustomTag>
		)
   }
}

Bar.propTypes = {
	type: PropTypes.PropTypes.oneOf(["top", "bottom"]).isRequired
};

export default Bar;
