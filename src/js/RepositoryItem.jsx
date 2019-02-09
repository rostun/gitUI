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
      return <div className="RepositoryItem">
         {this.state.repository.repoName}
         {this.state.repository.repoUrl}
         {this.state.repository.forked}
         {this.state.repository.description}
         {this.state.repository.stars}
         {this.state.repository.license}
      </div>;
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
