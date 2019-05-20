import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Guides from './components/Guides'
import PrivateRoute from './components/PrivateRoute'
import axios from 'axios'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
  }
  }

  handleLogin = (props) => {
    axios
    .post('https://bw-how-to.herokuapp.com/login', props)
    .then(res => {
        localStorage.setItem('jwt', res.data.token)
        this.setState({loggedIn: true})
        this.props.history.push('/')
    })
    .catch(err => {
        console.log(err)
    })
  }

  handleSignUp = (props) => {
    axios
    .post('https://bw-how-to.herokuapp.com/register', props)
    .then(res => {
        localStorage.setItem('jwt', res.data.token)
        this.setState({loggedIn: true})
        this.props.history.push('/')
    })
    .catch(err => {
        console.log(err)
    })
  }


  render() {
    return (
      <Router>
        <div className="App">
          <h3>How To</h3>
          <div>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </div>
          <Route path='/register'
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
          <PrivateRoute exact path="/" component={Guides} />
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
