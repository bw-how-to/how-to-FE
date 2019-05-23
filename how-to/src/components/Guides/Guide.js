import React from 'react';
import { withRouter } from 'react-router-dom'
import ReactPlayer from 'react-player'
import './Guides.scss';

class Guide extends React.Component {

    handleClick = () => {
        this.props.history.push(`/guides/${this.props.guide.id}`)
        // this.props.postSelected(this.props.guide.id)
    }

    render() {
        if (this.props.guide.title) {
            return (
                <div onClick={this.handleClick} className='feedGuide'>
                    <h4>{this.props.guide.title}</h4>
                    <div className='feedDescription'>{this.props.guide.description}</div>
                    <div className='video'>
                        <ReactPlayer className='reactVideo' url={this.props.guide.link} width='100%' height='100%' light controls />
                    </div>
                    <div className='feedUsername'>By: {this.props.guide.username}</div>
                </div>
            )
        }
        else {
            return (
                <div>
                    Hmmmm
                </div>
            )
        }
    }
}

export default withRouter(Guide)