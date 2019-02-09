import React, { Component } from "react";
import PropTypes from "prop-types";
//import axios from "axios";

import "../sass/AwesomeSearchModule.scss";

class AwesomeSearchModule extends Component {
   constructor(props) {
      super(props);

      this.state = {
         searchResults: null
      };
   }

   componentDidMount() {}

   componentDidUpdate(prevProps) {}

   _searchGit() {
      let params = {
         q: "tetris language",
         sort: "stars",
         order: "desc"
      };

      //axios.get("https://api.github.com/search/repositories", {params}).then((res) => {
      //  console.log(res);
      //})
      //.catch((error) => {
      //  console.log(error);
      //});

      const _Http = new XMLHttpRequest();
      const _params = `q=${params.q}&sort=${params.sort}&order=${params.order}`;
      const _url = `https://api.github.com/search/repositories?${_params}`;
      _Http.open("GET", _url, true); //true for asynchronous
      _Http.onreadystatechange = () => {
         if (_Http.readyState == 4 && _Http.status == 200) {
            this.setState({
               searchResults: _Http.responseText
            });
         }
      };
      _Http.send(null);
   }

   _renderForm() {
      return (
         <form className="searchForm">
            <label htmlFor="textInput">Text</label>
            <input type="text" id="textInput" />
            <label htmlFor="starInput">Stars</label>
            <input type="text" id="starInput" />
            <label htmlFor="selectLicense">License</label>
            <select id="selectLicense">
               <option>MIT</option>
               <option>ISC</option>
               <option>Apache</option>
               <option>GPL</option>
            </select>            
            <input type="checkbox" id="forkedFlag" />
            <label htmlFor="forkedFlag">Include Forked</label>
         </form>
      );
   }

   render() {
      return (
         <div className="AwesomeSearchModule">
            <h1 className="headerRow">Even Financial GitHub Repository Search</h1>
            <div className="searchRow">{this._renderForm()}</div>
            <div className="submitRow">
               <button type="button" onClick={this._searchGit.bind(this)}>
                  SEARCH
               </button>
            </div>
            {this.state.searchResults}
         </div>
      );
   }
}

AwesomeSearchModule.propTypes = {};

export default AwesomeSearchModule;
