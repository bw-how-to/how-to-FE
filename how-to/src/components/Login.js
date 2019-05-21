import React from 'react'
import { withRouter } from 'react-router-dom' 

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
        console.log(this.props)
        this.props.handleLogin(this.state.credentials)
        this.props.history.push('/guides')
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
                    <button type='submit'>
                        Login
                    </button>
                </form>
            </div>
        )
    }
}

export default withRouter(Login)