import React from 'react';
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Guides from './components/Guides'
import PrivateRoute from './components/PrivateRoute'
import PrivateRoute1 from './components/PrivateRoute1'
import Post from './components/Post'
import UserPosts from './components/UserPosts'
import NewGuide from './components/NewGuide'
import axios from 'axios'
import './App.css';
import createHistory from 'history/createBrowserHistory';

const history = createHistory(); 
const Auth = PrivateRoute1(Guides);

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: localStorage.getItem("jwt") === null ? false : true,
      loggingIn: false,
      guides: [],
      guideSelected: false,
      fetchingData: false,
      username: '',
      user_id: ''
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('jwt')
    const requestConfig = {
        headers: {
              authorization: token
        }
    }

    if (token) {
      this.setState({fetchingData: true})
    axios
    .get('https://bw-how-to.herokuapp.com/guides', requestConfig)
    .then(res => {
      this.setState({guides: res.data})
      this.setState({fetchingData: false})
    })
    .catch(err => console.log(err))
  }
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
      this.setState({fetchingData: true})
      axios
      .get('https://bw-how-to.herokuapp.com/guides', requestConfig)
      .then(res => {
        this.setState({guides: res.data})
        this.setState({fetchingData: false})
      })
      .catch(err => console.log(err))
      }
  }

  handleLogin = (props) => {
    this.setState({loggingIn: true})
    axios
    .post('https://bw-how-to.herokuapp.com/login', props)
    .then(res => {
      this.setState({loggedIn: true})
      console.log(res)
        localStorage.setItem('jwt', res.data.token)
        // this.props.history.push('/guides')
        this.getGuides()
        this.setState({loggingIn: false})
        this.setState({username: res.data.username})
        this.setState({user_id: res.data.id})

    })
    .catch(err => {
        console.log(err)
    })
  }

  handleSignUp = (props) => {
    this.setState({loggingIn: true})
    axios
    .post('https://bw-how-to.herokuapp.com/register', props)
    .then(res => {
      console.log(res)
        localStorage.setItem('jwt', res.data.token)
        this.setState({loggedIn: true, username: res.data.username, user_id: res.data.id})
        this.props.history.push('/guides')
        this.getGuides()
        this.setState({loggingIn: false})
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
      console.log(props, requestConfig)
      axios
      .post('https://bw-how-to.herokuapp.com/guides', props, requestConfig)
      .then(res => {
        console.log(res)
        // this.props.history.push('/guides')
        this.getGuides()
      })
      .catch(err => console.log(err))
      }
  }

  render() {
    console.log(this.state.guides)
    console.log(this.state)
    return (
      <Router history={history}>
        <div className="App">
          <h3>How To</h3>
          <div>
          <Link to="/guides">Guides</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/newguide">Create Guide</Link>
          </div>
          <Route path='/register'
          render={props => (
            <SignUp {...props}
            handleSignUp={this.handleSignUp}
            loggedIn={this.state.loggedIn}
            loggingIn={this.state.loggingIn}
            />
          )}
          />
          <Route path='/login'
          render={props => (
            <Login {...props}
            handleLogin={this.handleLogin}
            loggedIn={this.state.loggedIn}
            loggingIn={this.state.loggingIn}
            />
          )}
          />
           <PrivateRoute1 exact path='/guides' guides={this.state.guides} component={Guides} postSelected={this.postSelected} guideSelected={this.state.guideSelected} fetchingData={this.state.fetchingData} loggedIn={this.state.loggedIn} />        

          <Route exact path='/newguide'
          render={props => (
            <NewGuide {...props}
            loggedIn={this.state.loggedIn}
            handleNewGuide={this.handleNewGuide}
            postSelected={this.postSelected}
            getGuides={this.getGuides}
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
            getGuides={this.getGuides}
            />
          )}
          />

            <Route exact path='/guides/:username'
            render={props => (
              <UserPosts {...props}
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
