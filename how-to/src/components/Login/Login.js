import React from 'react'
import * as reactRouterDom from 'react-router-dom'
import  logo from '../../assets/Logo.png'
import './Login.scss'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            credentials: {
                username: '',
                password: '',
            },
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
                    <div className='logoContainer'>
                    <img className='loginLogo' src={logo} />
                    <h3>How-To</h3>
                    <div className='subtitle'>Learn Anything and Everything</div>
                    </div>
                    <form className='form' onSubmit={this.login}>
                        <input
                            autoCapitalize="none"
                            type='text'
                            name='username'
                            placeholder='Username'
                            autoComplete='off'
                            onChange={this.handleChanges}
                            value={this.state.username}
                            required
                        />
                        <input
                            autoCapitalize="none"
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

                    {this.props.loginError === true ? (
                        <div className='loginError'>Wrong Username or Password</div>
                    ) : (
                        <span></span>
                    )}

                    </form>
                </div>
            )
        }
        else if (this.props.loggedIn === true ){
            return <reactRouterDom.Redirect to={'/guides'} />
        }
    }
}

export default reactRouterDom.withRouter(Login)