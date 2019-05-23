import React from 'react'
import { Redirect } from 'react-router-dom'
import './Login.scss'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            credentials: {
                username: '',
                password: '',
                confirmPassword: '',
                type: ''
            },
            passwordsMatch: true
        }
    }

    handleChanges = (e) => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state)
    }

    signUp = (e) => {
        e.preventDefault()
        if (this.state.credentials.password === this.state.credentials.confirmPassword) {
            this.setState({ passwordsMatch: true })
            const creds = {username: this.state.credentials.username, password: this.state.credentials.password, type: this.state.credentials.type}
            this.props.handleSignUp(creds)
        }
        else {
            this.setState({passwordsMatch: false})
        }
        
    }

    render() {
        if (this.props.loggedIn === false ) {
            return (
                <div className='signUpForm'>
                    <form onSubmit={this.signUp}>
                        <input
                            autocapitalize="none"
                            type='text'
                            name='username'
                            placeholder='Username'
                            autoComplete='off'
                            onChange={this.handleChanges}
                            value={this.state.username}
                            required
                        />
                        <input
                            autocapitalize="none"
                            type='password'
                            name='password'
                            placeholder='Password'
                            autoComplete='off'
                            onChange={this.handleChanges}
                            value={this.state.password}
                            required
                        />
                        <input
                            autocapitalize="none"
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            autoComplete='off'
                            onChange={this.handleChanges}
                            value={this.state.confirmPassword}
                            required
                        />
                        <select name='type' defaultValue={'Account Type'} onChange={this.handleChanges}>
                            <option disabled value='Account Type'>Account Type</option>
                            <option value='creator'>Creator</option>
                            <option value='viewer'>Viewer</option>
                        </select>
                        <button type='submit'>
                        {this.props.loggingIn ? (
                            'Signing Up...'
                        ) : (
                            'Sign Up'
                        )}
                        </button>

                        {!this.state.passwordsMatch ? (
                        <div className='loginError'>Passwords Don't Match</div>
                        ) : (
                        <span></span>
                        )}

                    </form>
                </div>
            )
        }
        else {
            return <Redirect to={'/login'} />
        }
    }
}