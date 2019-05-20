import React from 'react'

export default class SignUp extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        return (
            <div className='signUpForm'>
                <form onSubmit={this.login}>
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