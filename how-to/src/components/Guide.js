import React from 'react';

export default class Guide extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return (
            <div className='feedGuide'>
                {this.props.guide.username}
                {this.props.guide.title}
            </div>
        )
    }
}