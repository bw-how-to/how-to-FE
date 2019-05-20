import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SignUp from './components/SignUp'
import Login from './components/Login'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h3>How To</h3>
        <div>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </div>
        <Route path='/signup' component={SignUp}/>
        <Route path='/login' component={Login}/>
      </div>
    </Router>
  );
}

export default App;
