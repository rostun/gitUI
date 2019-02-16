import React, { Component } from "react";
import { hot } from "react-hot-loader";

import AwesomeSearchModule from "./AwesomeSearchModule";
import Bar from "./Bar"

import "../sass/App.scss";

class App extends Component {
   constructor(props) {
      super(props);
   }
   
   render() {
      return (
         <div className="Container">
            <Bar type="top" />
            <AwesomeSearchModule />
            <Bar type="bottom" />
         </div>
      );
   }
}

export default hot(module)(App);
