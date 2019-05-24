import React from 'react'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Nav.scss'

class Nav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    logout = () => {
        localStorage.clear()
        this.props.logout()
        this.props.history.push('/login')
    }

    handleChanges = (e) => {
        this.setState({
            search: e.target.value
        })
        this.props.searchPosts(e)
    }

    searchClick = () => {
        this.props.history.push('/guides')
        document.querySelector(".fa-search").classList.toggle('hidden')
        document.querySelector(".searchInput").classList.toggle('hidden')
        document.querySelectorAll(".fas")[0].style.margin = "0 2px 0 2px";
        document.querySelectorAll(".fas")[1].style.margin = "0 2px 0 2px";
        document.querySelectorAll(".fas")[2].style.margin = "0 2px 0 2px";
        document.querySelectorAll(".fas")[3].style.margin = "0 2px 0 2px";
        document.querySelector(".searchInput").focus();
    }

    searchBlur = () => {
        document.querySelector(".fa-search").classList.toggle('hidden')
        document.querySelector(".searchInput").classList.toggle('hidden')
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
                    <Link to="/guides"><i className="fas fa-tools fa-2x"></i></Link>
                    <i onClick={this.searchClick} className="fas fa-search fa-2x"></i>
                    <input
                        onBlur={this.searchBlur}
                        className='searchInput hidden'
                        type='text'
                        name='search'
                        placeholder='Search'
                        onChange={this.handleChanges}
                        value={this.state.search} />
                    {localStorage.getItem('user_type') === 'creator' ? (
                    <Link to="/newguide"><i className="fas fa-plus fa-2x"></i></Link>
                    ) : (
                        <span></span>
                    )}
                    <div onClick={this.logout}><i onClick={this.logout} className="fas fa-sign-out-alt fa-2x"></i></div>
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

export default withRouter(Nav)