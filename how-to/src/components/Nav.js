import React from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends React.Component {
    render() {
        return (
            <div>
            {this.props.loggedIn === true ? (
                <div>
                <Link to="/guides">Guides</Link> 
                {this.props.user_type === 'creator' ? (
                    <Link to="/newguide">Create Guide</Link>
                ) : (
                    <div></div>
                )}
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