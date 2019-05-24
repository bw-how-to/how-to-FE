import React from 'react';
import { Redirect } from 'react-router-dom';

class NewGuide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            NewGuide: {
                title: '',
                user_id: this.props.user_id,
                type: 'cooking',
                description: '',
                link: '',
                step_1: '',
                step_2: '',
                step_3: '',
                step_4: '',
                step_5: '',

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
        console.log(this.state.NewGuide)
        e.preventDefault()
        this.props.handleNewGuide(this.state.NewGuide)
        this.props.history.push('/guides')
    }

    render() {
      return this.props.loggedIn === false ? (
        <Redirect to='/login'
        />
      ) : (
          <div className='newGuideContainer'>
            <h3>New Guide</h3>
            <form onSubmit={this.handleSubmit} className='newGuideForm'>
                Title:
                <input
                    autoCapitalize="none"
                    type='text'
                    name='title'
                    placeholder='Title'
                    onChange={this.handleChanges}
                    value={this.state.title}
                />
                Description:
                <input
                    autoCapitalize="none"
                    type='text'
                    name='description'
                    placeholder='Title'
                    onChange={this.handleChanges}
                    value={this.state.description}
                />
                Category: 
                <select name='type' required defaultValue={'Category'} onChange={this.handleChanges}>
                    <option disabled value='Category'>Category</option>
                    <option value='cooking'>Cooking</option>
                    <option value='Computers'>Computers</option>
                    <option value='cars'>Cars</option>
                    <option value='gaming'>Gaming</option>
                    <option value='handy-work'>Handy-Work</option>
                    <option value='Gardening'>Gardening</option>
                </select>
                Video URL:
                <input
                    autoCapitalize="none"
                    type='text'
                    name='link'
                    placeholder='URL'
                    onChange={this.handleChanges}
                    value={this.state.link}
                />
                Step 1:
                <textarea
                    autoCapitalize="none"
                    className='newStep'
                    type='text'
                    name='step_1'
                    placeholder='Step 1'
                    onChange={this.handleChanges}
                    value={this.state.step_1}
                />
                Step 2:
                <textarea
                    autoCapitalize="none"
                    className='newStep'
                    type='text'
                    name='step_2'
                    placeholder='Step 2'
                    onChange={this.handleChanges}
                    value={this.state.step_2}
                />
                Step 3:
                <textarea
                    autoCapitalize="none"
                    className='newStep'
                    type='text'
                    name='step_3'
                    placeholder='Step 3'
                    onChange={this.handleChanges}
                    value={this.state.step_3}
                />
                Step 4:
                <textarea
                    autoCapitalize="none"
                    className='newStep'
                    type='text'
                    name='step_4'
                    placeholder='Step 4'
                    onChange={this.handleChanges}
                    value={this.state.step_4}
                />
                Step 5:
                <textarea
                    autoCapitalize="none"
                    className='newStep'
                    type='text'
                    name='step_5'
                    placeholder='Step 5'
                    onChange={this.handleChanges}
                    value={this.state.step_5}
                />
                <button type='submit'>Add Guide</button>
            </form>
        </div>
      );
    }
}

export default NewGuide;