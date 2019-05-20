import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import axios from 'axios'
import './App.css';

class App extends React.Component {

  state = {
    loggedIn: false,
  }

  // handleLogin = (props) => {
  //   console.log('logged in!', props)
  //   axios
  //   .post('https://bw-how-to.herokuapp.com/login', props)
  //   .then(res => {
  //       localStorage.setItem('token', res.data.payload)
  //   })
  //   .catch(err => {
  //       console.log(err)
  //   })
  // }

  // handleSignUp = (props) => {
  //   console.log('signed up!', props)
  //   axios
  //   .post('https://bw-how-to.herokuapp.com/signup', props)
  //   .then(res => {
  //       localStorage.setItem('token', res.data.payload)
  //   })
  //   .catch(err => {
  //       console.log(err)
  //   })
  // }


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
