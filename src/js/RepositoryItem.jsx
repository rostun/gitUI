import React, { Component } from "react";
import PropTypes from "prop-types";

import "../sass/RepositoryItem.scss";

class RepositoryItem extends Component {
   constructor(props) {
      super(props);

      this.state = {
         repository: []
      };
   }

   componentDidMount() {
      this.setState({ repository: this.props.repository });
   }

   componentDidUpdate(prevProps) {
      if (this.props.repository !== prevProps.repository) {
         this.setState({ repository: this.props.repository });
      }
   }

   render() {
      const _repo = this.state.repository;

      if (!_repo || _repo.length === 0) {
         return null;
      }

      const _forked =
         _repo.forked === true ? (
            <label className="repoForked">forked</label>
         ) : null;

      return (
         <div className="RepositoryItem">
            <div className="repoBasicDetails">
               <div className="repoDetails">
                  <a className="repoLink" href={_repo.repoUrl}>
                     {_repo.repoName}
                  </a>
                  {_forked}
               </div>
               <div className="repoDescription">{_repo.description}</div>
            </div>
            <div className="repoStars">
               Stars:
               <div className="repoStarsValue"> {_repo.stars}</div>
            </div>
            <div className="repoLicense">
               License:
               <div className="repoLicenseValue"> {_repo.license}</div>
            </div>
         </div>
      );
   }
}

RepositoryItem.propTypes = {
   repository: PropTypes.shape({
      repoName: PropTypes.string,
      repoUrl: PropTypes.string,
      forked: PropTypes.bool,
      description: PropTypes.string,
      stars: PropTypes.number,
      license: PropTypes.string
   }).isRequired
};

export default RepositoryItem;
