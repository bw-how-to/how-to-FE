import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Guides from './components/Guides'
import PrivateRoute from './components/PrivateRoute'
import Post from './components/Post'
import axios from 'axios'
import './App.css';

const Auth = PrivateRoute(Guides);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: true,
      guides: [],
      guideSelected: false,
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt')
    const requestConfig = {
        headers: {
              authorization: token
        }
    }

    axios
    .get('https://bw-how-to.herokuapp.com/guides', requestConfig)
    .then(res => this.setState({guides: res.data}))
    .catch(err => console.log(err))
  }

  postSelected = props => {
    console.log(';lkasjdf;lkajsdf')
    this.setState({ guideSelected: props})
  }

  getGuides = () => {
    const token = localStorage.getItem('jwt')
    const requestConfig = {
        headers: {
             authorization: token
        }
    }

    if (token) {
      axios
      .get('https://bw-how-to.herokuapp.com/guides', requestConfig)
      .then(res => this.setState({guides: res.data}))
      .catch(err => console.log(err))
      }
  }

  handleLogin = (props) => {
    axios
    .post('https://bw-how-to.herokuapp.com/login', props)
    .then(res => {
        localStorage.setItem('jwt', res.data.token)
        // this.getGuides()
        this.props.history.push('/guides')
        this.setState({loggedIn: true})
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
        this.props.history.push('/guides')
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
          {/* <PrivateRoute exact path="/" component={Guides} guides={this.state.guides} /> */}
          <Route exact path='/guides'
          render={props => (
            <Auth {...props}
            guides={this.state.guides}
            guideSelected={this.state.guideSelected}
            postSelected={this.postSelected}
            />
          )}
          />
          <Route exact path='/guides/:id'
          render={props => (
            <Post {...props}
            guides={this.state.guides}
            id={this.state.guideSelected}
            loggedIn={this.state.loggedIn}
            />
          )}
          />
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
