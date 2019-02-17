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
         starsError: "",
         license: "mit",
         fork: false,
         isLoading: false,
         searchResults: null
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

      const _params = `q=${params.q}+stars:${params.stars}+license:${
         params.license
      }+${params.fork}&page=1&per_page=25&sort=stars`;
      //const _params = this._testForked(params);

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

   _isNumber(numberString) {
      const _numString = numberString * 1;
      return !isNaN(_numString);
   }

   _isWholeNumber(numberString) {
      const reg = new RegExp("^[0-9]+$");
      return reg.test(numberString);
   }

   _testStars(value) {
      let _range = "..";
      let _lessThan = "<";
      let _moreThan = ">";

      let _expression = [];

      //if it contains a character of interest, split the string and test the numbers
      if (value.indexOf(_range) !== -1) {
         _expression = value.split(_range);
         if (
            _expression.length === 2 &&
            this._isWholeNumber(_expression[0]) &&
            this._isWholeNumber(_expression[1])
         ) {
            return true;
         }
         return false;
      }
      if (value.indexOf(_lessThan) !== -1) {
         _expression = value.split(_lessThan);
         if (_expression.length === 2 && this._isWholeNumnber(_expression[1])) {
            return true;
         }
         return false;
      }
      if (value.indexOf(_moreThan) !== -1) {
         _expression = value.split(_moreThan);
         if (_expression.length === 2 && this._isWholeNumber(_expression[1])) {
            return true;
         }
         return false;
      }
      return false;
   }

   _updateTextInputValue(value) {
      this.setState({
         q: value
      });
   }

   _updateStarInputValue(value) {
      let _starsError =
         this._testStars(value) === true || value === ""
            ? ""
            : "0..100, 200, >1000";

      this.setState({
         stars: value,
         starsError: _starsError
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
      const _disabled = this.state.isLoading === true ? true : false;

      return (
         <form className="searchForm">
            <InputModule
               name="searchRepo"
               idName="textInput"
               inputType="text"
               onChange={this._updateTextInputValue.bind(this)}
               labelContent={<div className="textLabel">Text</div>}
               disabled={_disabled}
            />
            <InputModule
               name="searchStars"
               idName="starInput"
               inputType="text"
               onChange={this._updateStarInputValue.bind(this)}
               labelContent={
                  <div className="starsLabel">
                     Stars{" "}
                     <span className="starsError">{this.state.starsError}</span>
                  </div>
               }
               inputPlaceholder="0..100, 200, >1000"
               disabled={_disabled}
            />
            <InputModule
               name="searchLicense"
               idName="selectLicense"
               inputType="select"
               onChange={this._updateLicenseValue.bind(this)}
               labelContent={<div className="licenseLabel">License</div>}
               inputContent={[
                  { value: "mit", label: "MIT" },
                  { value: "isc", label: "ISC" },
                  { value: "apache-2.0", label: "Apache license 2.0" },
                  { value: "gpl", label: "GNU General Public License Family" }
               ]}
               disabled={_disabled}
            />
            <InputModule
               name="searchForked"
               idName="forkedFlag"
               inputType="checkbox"
               onChange={this._updateForkValue.bind(this)}
               labelContent={
                  <span className="forkedLabel">Include Forked</span>
               }
               labelPosition="after"
               disabled={_disabled}
            />
         </form>
      );
   }

   render() {
      const _searchResults = this.state.searchResults;

      const _resultHeader =
         _searchResults === null
            ? "Please enter query and click SEARCH button above, results appear here."
            : "SEARCH results: ";
      const _resultSection =
         this.state.isLoading === true ? (
            <div className="loader" />
         ) : (
            _searchResults
         );

      const _resultsRow = (
         <div className="resultsRow">
            <div className="resultsHeaderRow">{_resultHeader}</div>
            <div className="results">{_resultSection}</div>
         </div>
      );

      const _disabled = this.state.starsError !== "" ? true : false;

      return (
         <div className="AwesomeSearchModule">
            <div className="headerRow">
               Even Financial <span>GitHub Repository Search</span>
            </div>
            <div className="searchRow">{this._renderForm()}</div>
            <div className="submitRow">
               <button
                  type="button"
                  onClick={this._searchGit.bind(this)}
                  disabled={_disabled}
               >
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
