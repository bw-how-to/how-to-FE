import React from 'react'
import { withRouter, Redirect } from 'react-router-dom' 
import './Login.scss'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            credentials: {
                username: '',
                password: '',
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

    login = (e) => {
        e.preventDefault()
        this.props.handleLogin(this.state.credentials)
        this.props.history.push('/guides')
    }

    render() {
        if (this.props.loggedIn === false ) {
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
                    <button type='submit'>
                    {this.props.loggingIn ? (
                        'Logging In...'
                    ) : (
                        'Log in'
                    )}
                    </button>
                    </form>
                </div>
            )
        }
        else if (this.props.loggedIn === true ){
            return <Redirect to={'/guides'} />
        }
    }
}

export default withRouter(Login)