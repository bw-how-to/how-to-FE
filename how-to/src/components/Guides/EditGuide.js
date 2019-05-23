import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class EditGuide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
                id: this.props.postToEdit.post_id,
                title: this.props.postToEdit.title,
                user_id: this.props.user_id,
                type: this.props.postToEdit.type,
                link: this.props.postToEdit.link,
                description: this.props.postToEdit.description,
                step_1: this.props.postToEdit.step_1,
                step_2: this.props.postToEdit.step_2,
                step_3: this.props.postToEdit.step_3,
                step_4: this.props.postToEdit.step_4,
                step_5: this.props.postToEdit.step_5,
    
        }
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const token = localStorage.getItem('jwt')
        const requestConfig = {
            headers: {
                 authorization: token
            }
        }
    
        if (token) {
          console.log(this.props.match.params.id, requestConfig)
          axios
          .put(`https://bw-how-to.herokuapp.com/guides/${this.state.id}`, this.state, requestConfig)
          .then(res => {
              console.log(res)
              this.props.history.push('/guides')
              this.props.getGuides()
            })
          .catch(err => console.log(err))
          }
      }

    render() {
        console.log(this.props.postToEdit.username)
        return this.props.loggedIn === false ? (
            <Redirect to='/login'
            />
            ) : (
                <div className='newGuideContainer'>
                <h3>Update Guide</h3>
                <form onSubmit={this.handleSubmit} className='newGuideForm'>
                    Title:
                    <input
                        autocapitalize="none"
                        type='text'
                        name='title'
                        placeholder='Title'
                        onChange={this.handleChanges}
                        value={this.state.title}
                    />
                    Description:
                    <input
                        autocapitalize="none"
                        type='text'
                        name='description'
                        placeholder='Title'
                        onChange={this.handleChanges}
                        value={this.state.description}
                    />
                    Video URL:
                    <input
                        autocapitalize="none"
                        type='text'
                        name='link'
                        placeholder='URL'
                        onChange={this.handleChanges}
                        value={this.state.link}
                    />
                    Step 1:
                    <textarea
                        autocapitalize="none"
                        type='text'
                        name='step_1'
                        placeholder='Step 1'
                        onChange={this.handleChanges}
                        value={this.state.step_1}
                    />
                    Step 2:
                    <textarea
                        autocapitalize="none"
                        type='text'
                        name='step_2'
                        placeholder='Step 2'
                        onChange={this.handleChanges}
                        value={this.state.step_2}
                    />
                    Step 3:
                    <textarea
                        type='text'
                        name='step_3'
                        placeholder='Step 3'
                        onChange={this.handleChanges}
                        value={this.state.step_3}
                    />
                    Step 4:
                    <textarea
                        autocapitalize="none"
                        type='text'
                        name='step_4'
                        placeholder='Step 4'
                        onChange={this.handleChanges}
                        value={this.state.step_4}
                    />
                    Step 5:
                    <textarea
                        autocapitalize="none"
                        type='text'
                        name='step_5'
                        placeholder='Step 5'
                        onChange={this.handleChanges}
                        value={this.state.step_5}
                    />
                    <button type='submit'>Update Guide</button>
                </form>
            </div>
            );
    }
}

export default EditGuide