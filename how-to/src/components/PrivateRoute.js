import React from 'react';
import { Redirect } from 'react-router-dom';

const PrivateRoute =  Login => Guides =>
  class extends React.Component {

    render() {
      return this.props.loggedIn === false ? (
        <Login 
        handleLogin={this.handleLogin}
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