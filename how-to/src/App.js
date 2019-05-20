import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import './App.css';

class App extends React.Component {

  state = {
    loggedIn: false,
  }

  handleLogin = () => {
    console.log('logged in!')
  }

  handleSignUp = () => {
    console.log('signed up!')
  }


  render() {
    return (
      <Router>
        <div className="App">
          <h3>How To</h3>
          <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </div>
          <Route path='/signup'
          render={props => (
            <SignUp {...props}
            handleSignUp={this.handleSignUp}
            />
          )}
          />
          <Route path='/login'
          render={props => (
            <Login {...props}
            handleLogin={this.handleLogin}
            />
          )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
