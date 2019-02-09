import React, { Component } from "react";

import "../sass/AwesomeSearchModule.scss";

class AwesomeSearchModule extends Component {
   constructor(props) {
      super(props);

      this.state = {
         q: '',
         stars: '',
         license: 'mit',
         fork: false,
         searchResults: []
      };
   }

   componentDidMount() {}

   componentDidUpdate(prevProps) {}

   _searchGit() {  
      const params = {
         q: this.state.q, //"tetris language",
         license: this.state.license, //'gpl',
         stars: this.state.stars, //"stars",
         fork: this.state.fork === true ? 'fork:true' : ''
      };

      const _Http = new XMLHttpRequest();
      const _params = `q=${params.q}+stars:${params.stars}+license:${params.license}+${params.fork}&per_page=10&sort=stars`;
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

   _testFork(params) {
      return `q=${params.q}+stars:${params.stars}+license:${params.license}+${params.fork}+fork:only&per_page=10&sort=stars`;
   }
   
   _processSearchResults(res) {
      let _searchResults = [];
      if(res.items && res.items.length > 0) {
         res.items.forEach((item) => {
            _searchResults.push({
               repoName: item.full_name,
               repoUrl: item.html_url,
               forked: item.fork,
               description: item.description,
               stars: item.stargazers_count,
               license: item.hasOwnProperty('license') ? item.license.name : null
            });
         });
      }
      console.log(_searchResults);

      this.setState({
         searchResults: _searchResults
      });
   }

   _updateTextInputValue(e) {
      this.setState({
         q: e.target.value 
      });
   }
   
   _updateStarInputValue(e) {
      this.setState({
         stars: e.target.value
      });
   }

   _updateLicenseValue(e) {
      this.setState({
         license: e.target.value
      });
   }

   _updateForkValue(e) {
      this.setState({
         fork: e.target.checked
      });
   }

   _renderForm() {
      return (
         <form className="searchForm">
            <label htmlFor="textInput">Text</label>
            <input type="text" id="textInput" value={this.state.q} onChange={this._updateTextInputValue.bind(this)}/>
            <label htmlFor="starInput">Stars</label>
            <input type="text" id="starInput" placeholder="0..100, 200, >1000" value={this.state.stars} onChange={this._updateStarInputValue.bind(this)}/>
            <label htmlFor="selectLicense">License</label>
            <select id="selectLicense" value={this.state.license} onChange={this._updateLicenseValue.bind(this)}>
               <option value="mit">MIT</option>
               <option value="isc">ISC</option>
               <option value="apache-2.0">Apache license 2.0</option>
               <option value="gpl">GNU General Public License family</option>
            </select>            
            <input type="checkbox" id="forkedFlag" onChange={this._updateForkValue.bind(this)} />
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
         </div>
      );
   }
}

export default AwesomeSearchModule;
