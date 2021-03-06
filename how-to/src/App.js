import React from 'react';
import { BrowserRouter as Router, Route, withRouter, Redirect } from 'react-router-dom'
import SignUp from './components/Login/SignUp'
import Login from './components/Login/Login'
import Guides from './components/Guides/Guides'
import Nav from './components/Nav/Nav'
import PrivateRoute1 from './components/PrivateRoute1'
import Post from './components/Guides/Post'
import UserPosts from './components/Guides/UserPosts'
import NewGuide from './components/Guides/NewGuide'
import EditGuide from './components/Guides/EditGuide'
import axios from 'axios'
import './App.css';
import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory(); 

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedIn: localStorage.getItem("jwt") === null ? false : true,
      loggingIn: false,
      guides: [],
      guideSelected: false,
      fetchingData: false,
      username: localStorage.getItem('username'),
      user_id: localStorage.getItem('user_id'),
      user_type: localStorage.getItem('user_type'),
      filteredPosts: true,
      postToEdit: {}
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
    .catch(err => {
      console.log(err)
      localStorage.clear()
      this.setState({loggedIn: false})
    })
  }
}

  // postSelected = props => {
  //   this.setState({ guideSelected: props})
  // }

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
        console.log(res)
        this.setState({guides: res.data})
        this.setState({fetchingData: false})
        this.setState({username: localStorage.getItem('username'), user_id: localStorage.getItem('user_id'), user_type: localStorage.getItem('user_type')})
      })
      .catch(err => {
        console.log(err)
        localStorage.clear()
        this.setState({loggedIn: false})
      })
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
        this.setState({loggingIn: false, loginError: false})
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('user_id', res.data.id)
        localStorage.setItem('user_type', res.data.type)
        this.getGuides()

    })
    .catch(err => {
      this.setState({ loggedIn: false, loggingIn: false, loginError: true })
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
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('user_id', res.data.id)
        localStorage.setItem('user_type', res.data.type)
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
      axios
      .post('https://bw-how-to.herokuapp.com/guides', props, requestConfig)
      .then(res => {
        console.log(res)
        this.getGuides()
      })
      .catch(err => console.log(err))
      }
  }

  searchPosts = (event) => {
    let newFilteredData = this.state.guides.filter(each => {
      if (each.description.toUpperCase().includes(event.target.value.toUpperCase()) || each.title.toUpperCase().includes(event.target.value.toUpperCase()) || each.username.toUpperCase().includes(event.target.value.toUpperCase()) ) {
        return each;
      }
      else {
        return false
      }
    })
    this.setState({ filteredPosts: newFilteredData });
  }

  editPost = (props) => {
    this.setState({postToEdit: props})
  }

  logout = () => {
    localStorage.clear()
    this.setState({loggedIn: false})
    this.props.history.push('/login')
  }

  render() {
    return (
      <Router history={history}>
        <div className='container'>
          <div className="App">
            <Route exact path='/'
            render={() => (
              <Redirect to='/guides' />
            )} />
            <Nav 
              loggedIn={this.state.loggedIn}
              user_type={this.state.user_type}
              searchPosts={this.searchPosts}
              logout={this.logout}
            />
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
              loginError={this.state.loginError}
              />
            )}
            />
            <PrivateRoute1 exact path='/guides' guides={this.state.guides} component={Guides} postSelected={this.postSelected} guideSelected={this.state.guideSelected} fetchingData={this.state.fetchingData} loggedIn={this.state.loggedIn} filteredPosts={this.state.filteredPosts} />        

            <Route exact path='/newguide'
            render={props => (
              <NewGuide {...props}
              loggedIn={this.state.loggedIn}
              handleNewGuide={this.handleNewGuide}
              postSelected={this.postSelected}
              getGuides={this.getGuides}
              user_type={this.state.user_type}
              user_id={this.state.user_id}
              />
            )}
            />

            <Route exact path='/editguide'
            render={props => (
              <EditGuide {...props}
              postToEdit={this.state.postToEdit}
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
              user_id={this.state.user_id}
              user_type={this.state.user_type}
              username={this.state.username}
              editPost={this.editPost}
              />
            )}
            />

            <Route exact path='/guides/users/:username'
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
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
