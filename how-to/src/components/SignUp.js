import React from 'react'
import { Redirect } from 'react-router-dom'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            credentials: {
                username: '',
                password: '',
                confirmPassword: '',
                type: ''
            }
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
            const creds = {username: this.state.credentials.username, password: this.state.credentials.password, type: this.state.credentials.type}
            this.props.handleSignUp(creds)
        }
        else {
            console.log("Passwords don't match")
        }
        
    }

    render() {
        if (this.props.loggedIn === false ) {
            return (
                <div className='signUpForm'>
                    <form onSubmit={this.signUp}>
                        <input
                            type='text'
                            name='username'
                            placeholder='Username'
                            autoComplete='off'
                            onChange={this.handleChanges}
                            value={this.state.username}
                            required
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            autoComplete='off'
                            onChange={this.handleChanges}
                            value={this.state.password}
                            required
                        />
                        <input
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            autoComplete='off'
                            onChange={this.handleChanges}
                            value={this.state.confirmPassword}
                            required
                        />
                        <select name='type' defaultValue={''} onChange={this.handleChanges}>
                            <option disabled value=''>-</option>
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
                    </form>
                </div>
            )
        }
        else {
            return <Redirect to={'/login'} />
        }
    }
}