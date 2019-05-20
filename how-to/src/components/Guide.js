import React from 'react';
import { withRouter } from 'react-router-dom'

class Guide extends React.Component {
    constructor(props) {
        super(props)
    }

    handleClick = () => {
        console.log('click')
        this.props.history.push(`/guides/${this.props.guide.id}`)
        this.props.postSelected(this.props.guide.id)
    }

    render() {
        console.log(this.props)
        return (
            <div onClick={this.handleClick} className='feedGuide'>
                {this.props.guide.username}
                {this.props.guide.title}
            </div>
        )
    }
}

export default withRouter(Guide)