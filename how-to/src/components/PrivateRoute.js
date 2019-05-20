import React from 'react';
import { Route, Redirect } from 'react-router-dom';

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
        />
      );
    }
  };

export default PrivateRoute;