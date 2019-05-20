import React from 'react';
import { Redirect } from 'react-router-dom';

class NewGuide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            NewGuide: {
                title: '',
                description: '',
                step_1: '',
                step_2: '',
                step_3: '',
                step_4: '',
                step_5: '',
                type: 'cooking',
                user_id: 1
            }
        }
    }

    handleChanges = (e) => {
        this.setState({
            NewGuide: {
                ...this.state.NewGuide,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleNewGuide(this.state.NewGuide)
    }

    render() {
      return this.props.loggedIn === false ? (
        <Redirect to='/login'
        />
      ) : (
          <div>
            <h3>New Guide</h3>
            <form onSubmit={this.handleSubmit} className='newGuideForm'>
                Title:
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    onChange={this.handleChanges}
                    value={this.state.title}
                />
                Description:
                <input
                    type='text'
                    name='description'
                    placeholder='Title'
                    onChange={this.handleChanges}
                    value={this.state.description}
                />
                Step 1:
                <input
                    type='text'
                    name='step_1'
                    placeholder='Step 1'
                    onChange={this.handleChanges}
                    value={this.state.step_1}
                />
                Step 2:
                <input
                    type='text'
                    name='step_2'
                    placeholder='Step 2'
                    onChange={this.handleChanges}
                    value={this.state.step_2}
                />
                Step 3:
                <input
                    type='text'
                    name='step_3'
                    placeholder='Step 3'
                    onChange={this.handleChanges}
                    value={this.state.step_3}
                />
                <button type='submit'>Add Guide</button>
            </form>
        </div>
      );
    }
}

export default NewGuide;