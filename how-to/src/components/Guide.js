import React from 'react';
import { withRouter } from 'react-router-dom'

class Guide extends React.Component {

    handleClick = () => {
        this.props.history.push(`/guides/${this.props.guide.id}`)
        this.props.postSelected(this.props.guide.id)
    }

    render() {
        return (
            <div onClick={this.handleClick} className='feedGuide'>
                {this.props.guide.username}
                {this.props.guide.title}
            </div>
        )
    }
}

export default withRouter(Guide)