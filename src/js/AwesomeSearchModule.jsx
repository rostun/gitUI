import React, { Component } from "react";

import "../sass/AwesomeSearchModule.scss";
import RepositoryItem from "../js/RepositoryItem";
import InputModule from "../js/InputModule";

import CircularProgress from "@material-ui/core/CircularProgress";

class AwesomeSearchModule extends Component {
   constructor(props) {
      super(props);

      this.state = {
         q: "",
         stars: "",
         license: "mit",
         fork: false,
         isLoading: false,
         searchResults: []
      };
   }

   async _searchGit() {
      this.setState({
         isLoading: true
      });

      const params = {
         q: this.state.q, //"tetris language",
         license: this.state.license, //'gpl',
         stars: this.state.stars, //"stars",
         fork: this.state.fork === true ? "fork:true" : ""
      };

      //const _params = `q=${params.q}+stars:${params.stars}+license:${params.license}+${params.fork}&page=1&per_page=10&sort=stars`;
      const _params = this._testForked(params);

      const _url = `https://api.github.com/search/repositories?${_params}`;

      try {
         let result = await this.makeRequest("GET", _url);
         this._processSearchResults(result);
      } catch (error) {
         this._processError(error);
      }
   }

   async makeRequest(method, url) {
      var xhr = new XMLHttpRequest();
      return new Promise((resolve, reject) => {
         xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status >= 300) {
               reject("Error, status code = " + xhr.status);
            }
            if (xhr.readyState == 4 && xhr.status === 200) {
               resolve(xhr.responseText);
            }
         };
         xhr.open(method, url, true);
         xhr.send();
      });
   }

   _testForked(params) {
      return `q=${params.q}+stars:${params.stars}+license:${params.license}+${
         params.fork
      }+fork:only&per_page=100&sort=stars`;
   }

   _processSearchResults(res) {
      let _repos = JSON.parse(res);

      let _searchResults = [];

      if (_repos.items && _repos.items.length > 0) {
         _searchResults = _repos.items.map((item, idx) => {
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
         searchResults: _searchResults,
         isLoading: false
      });
   }

   _processError(err) {
      console.log(err);
      this.setState({
         searchResults: [],
         isLoading: false
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
      let _searchResults = this.state.searchResults;

      let _resultHeader = !_searchResults || _searchResults.length === 0 ? 'Please enter query and click SEARCH button above, results appear here.' : 'SEARCH results: ';
      let _resultSection = this.state.isLoading === true ? <CircularProgress/> : _searchResults;

      let _resultsRow = (
         <div className="resultsRow">
            <h3 className="resultsHeaderRow">
              {_resultHeader}
            </h3>
            <div className="results">{_resultSection}</div>
         </div>
      );

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
            {_resultsRow}
         </div>
      );
   }
}

export default AwesomeSearchModule;
