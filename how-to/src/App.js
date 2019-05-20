import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import SignUp from './components/SignUp'
import Login from './components/Login'
import Guides from './components/Guides'
import PrivateRoute from './components/PrivateRoute'
import Post from './components/Post'
import NewGuide from './components/NewGuide'
import axios from 'axios'
import './App.css';
import createHistory from 'history/createBrowserHistory';

const history = createHistory(); 
const Auth = PrivateRoute(Guides);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: localStorage.getItem("jwt") === null ? false : true,
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
        this.getGuides()
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

  handleNewGuide = (props) => {
    const token = localStorage.getItem('jwt')
    const requestConfig = {
        headers: {
             authorization: token
        }
    }

    if (token) {
      console.log(props)
      axios
      .post('https://bw-how-to.herokuapp.com/guides', requestConfig, props)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      }
  }


  render() {
    console.log(this.state.guides)
    return (
      <Router history={history}>
        <div className="App">
          <h3>How To</h3>
          <div>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/newguide">Create Guide</Link>
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

          <Route exact path='/newguide'
          render={props => (
            <NewGuide {...props}
            loggedIn={this.state.loggedIn}
            handleNewGuide={this.handleNewGuide}
            />
          )}
          />

          <Route exact path='/guides/:id'
          render={props => (
            <Post {...props}
            guides={this.state.guides}
            id={this.state.guideSelected}
            loggedIn={this.state.loggedIn}
            getGuides={this.getGuides}
            />
          )}
          />
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
