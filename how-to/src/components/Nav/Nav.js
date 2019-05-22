import React from 'react'
import { Link } from 'react-router-dom'
import './Nav.scss'

export default class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    logout = () => {
        localStorage.clear()
        this.props.history.push('/login')
    }

    handleChanges = (e) => {
        this.setState({
            search: e.target.value
        })
        this.props.searchPosts(e)
    }


    scrollFunction = () => {
        if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
            document.querySelector(".navContainer").style.padding = "0px 10px";
            document.querySelector(".navContainer").style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
        } else {
            document.querySelector(".navContainer").style.padding = "20px 10px";
            document.querySelector(".navContainer").style.boxShadow = "none";
        }
    }

    render() {
        window.onscroll = () => {this.scrollFunction()};
        return (
            <div className='navContainer'> <h3 className='title'> How To </h3>
            {this.props.loggedIn === true ? (
                <div className='navBar'>
                    <Link to="/guides">Guides</Link>
                    <input
                        type='text'
                        name='search'
                        placeholder='Search'
                        onChange={this.handleChanges}
                        value={this.state.search} />
                    {localStorage.getItem('user_type') === 'creator' ? (
                    <Link to="/newguide">Create Guide</Link>
                    ) : (
                        <span></span>
                    )}
                    <Link onClick={this.logout} to={'/login'}>Logout</Link>
                </div>
            ) : (
                <div>
                    <Link to="/register">Register</Link> 
                    <Link to="/login">Login</Link>
                </div>
            )}
            </div>
        )
    }
}