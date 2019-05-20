import React from 'react';
import axios from 'axios';

export default class Guides extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h3>
                    Guides:
                </h3>
                {this.props.guides.map(guide => (
                    <div className='feedGuide' key={guide.title}>
                        <p key={guide.title}>{guide.username}</p>
                    </div>
                ))}
            </div>
        )
    }
}