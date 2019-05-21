import React from 'react';
import { withRouter } from 'react-router-dom'
import ReactPlayer from 'react-player'

class Guide extends React.Component {

    handleClick = () => {
        this.props.history.push(`/guides/${this.props.guide.id}`)
        this.props.postSelected(this.props.guide.id)
    }

    render() {
        return (
            <div onClick={this.handleClick} className='feedGuide'>
                <h4>{this.props.guide.title}</h4>
                <div className='feedDescription'>{this.props.guide.description}</div>
                <ReactPlayer url={this.props.guide.link} light controls />
                <div className='feedUsername'>By: {this.props.guide.username}</div>
            </div>
        )
    }
}

export default withRouter(Guide)