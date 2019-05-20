import React from 'react'

export default class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            credentials: {
                username: '',
                password: '',
                confirmPassword: ''
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
    }

    signUp = (e) => {
        e.preventDefault()
        if (this.state.credentials.password === this.state.credentials.confirmPassword) {
            const creds = {username: this.state.credentials.username, password: this.state.credentials.password}
            this.props.handleSignUp(creds)
        }
        else {
            console.log("Passwords don't match")
        }
        
    }

    render() {
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
                    <button>
                        Sign Up
                    </button>
                </form>
            </div>
        )
    }
}