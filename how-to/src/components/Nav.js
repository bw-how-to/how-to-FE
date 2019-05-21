import React from 'react'
import { Link } from 'react-router-dom'

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

    render() {
        return (
            <div className='navBar'> How To
            {this.props.loggedIn === true ? (
                <div>
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