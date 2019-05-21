import React from 'react'
import { Link } from 'react-router-dom'

export default class Nav extends React.Component {
    render() {
        return (
            <div>
            <Link to="/guides">Guides</Link>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
            <Link to="/newguide">Create Guide</Link>
            </div>
        )
    }
}