import React from 'react';
import Guide from './Guide'

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
                        <Guide key={guide.title} guide={guide}/>
                ))}
            </div>
        )
    }
}