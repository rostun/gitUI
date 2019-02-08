import React, { Component } from "react";
import PropTypes from "prop-types";

import "../sass/AwesomeSearchModule.scss";

class AwesomeSearchModule extends Component {
   constructor(props) {
      super(props);

      this.state = {
      };
   }

   componentDidMount() {
   }

   componentDidUpdate(prevProps) {
   }

   render() {

      return (
         <div className="AwesomeSearchModule">
            some search stuff
         </div>
      );
   }
}

AwesomeSearchModule.propTypes = {
};

export default AwesomeSearchModule;
