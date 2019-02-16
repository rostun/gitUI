import React, { Component } from "react";

import "../sass/AwesomeSearchModule.scss";
import RepositoryItem from "../js/RepositoryItem";
import InputModule from "../js/InputModule";

class AwesomeSearchModule extends Component {
   constructor(props) {
      super(props);

      this.state = {
         q: "",
         stars: "",
         license: "mit",
         fork: false,
         searchResults: []
      };
   }

   _searchGit() {
      const params = {
         q: this.state.q, //"tetris language",
         license: this.state.license, //'gpl',
         stars: this.state.stars, //"stars",
         fork: this.state.fork === true ? "fork:true" : ""
      };

      const _Http = new XMLHttpRequest();
      const _params = `q=${params.q}+stars:${params.stars}+license:${
         params.license
      }+${params.fork}&page=1&per_page=10&sort=stars`;
      const _url = `https://api.github.com/search/repositories?${_params}`;
      _Http.open("GET", _url, true); //true for asynchronous
      _Http.onreadystatechange = () => {
         if (_Http.readyState == 4 && _Http.status == 200) {
            const _res = JSON.parse(_Http.responseText);
            this._processSearchResults(_res);
         }
      };
      _Http.send(null);
   }

   _testForked(params) {
      return `q=${params.q}+stars:${params.stars}+license:${params.license}+${
         params.fork
      }+fork:only&per_page=10&sort=stars`;
   }

   _processSearchResults(res) {
      let _searchResults = [];

      if (res.items && res.items.length > 0) {
         _searchResults = res.items.map((item, idx) => {
            const _item = {
               repoName: item.full_name,
               repoUrl: item.html_url,
               forked: item.fork,
               description: item.description,
               stars: item.stargazers_count,
               license: item.hasOwnProperty("license")
                  ? item.license.name
                  : null
            };
            return <RepositoryItem key={`repo-${idx}`} repository={_item} />;
         });
      }

      this.setState({
         searchResults: _searchResults
      });
   }

   _updateTextInputValue(value) {
      this.setState({
         q: value
      });
   }

   _updateStarInputValue(value) {
      this.setState({
         stars: value
      });
   }

   _updateLicenseValue(value) {
      this.setState({
         license: value
      });
   }

   _updateForkValue(value) {
      this.setState({
         fork: value
      });
   }

   _renderResults() {

   }

   _renderForm() {
      return (
         <form className="searchForm">
            <InputModule
               name="searchRepo"
               idName="textInput"
               inputType="text"
               onChange={this._updateTextInputValue.bind(this)}
               labelContent="Text"
            />
            <InputModule
               name="searchStars"
               idName="starInput"
               inputType="text"
               onChange={this._updateStarInputValue.bind(this)}
               labelContent="Stars"
               inputPlaceholder="0..100, 200, >1000"
            />
            <InputModule
               name="searchLicense"
               idName="selectLicense"
               inputType="select"
               onChange={this._updateLicenseValue.bind(this)}
               labelContent="License"
               inputContent={[
                  { value: "mit", label: "MIT" },
                  { value: "isc", label: "ISC" },
                  { value: "apache-2.0", label: "Apache license 2.0" },
                  { value: "gpl", label: "GNU General Public License Family" }
               ]}
            />
            <InputModule
               name="searchForked"
               idName="forkedFlag"
               inputType="checkbox"
               onChange={this._updateForkValue.bind(this)}
               labelContent="Include Forked"
               labelPosition="after"
            />
         </form>
      );
   }

   render() {
      let _results = this._renderResults()
         this.state.searchResults.length === 0 ? "" : this.state.searchResults;

      return (
         <div className="AwesomeSearchModule">
            <h1 className="headerRow">
               Even Financial GitHub Repository Search
            </h1>
            <div className="searchRow">{this._renderForm()}</div>
            <div className="submitRow">
               <button type="button" onClick={this._searchGit.bind(this)}>
                  SEARCH
               </button>
            </div>
            <hr className="divider" />
            <div className="resultsRow">
               <h3 className="resultsHeaderRow">
                  Please enter query and click SEARCH button above, results
                  appear here.
               </h3>
               <div className="results">{_results}</div>
            </div>
         </div>
      );
   }
}

export default AwesomeSearchModule;
