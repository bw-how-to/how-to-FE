import React from 'react';
import { Redirect } from 'react-router-dom';

const PrivateRoute =  Guides =>
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loggedIn: localStorage.getItem("jwt") === null ? false : true
      };
    }

    render() {
      return this.state.loggedIn === false ? (
        <Redirect to='/login'
        />
      ) : (
        <Guides
            guides={this.props.guides}
            postSelected={this.props.postSelected}
            guideSelected={this.props.guideSelected}
        />
      );
    }
  };

export default PrivateRoute;