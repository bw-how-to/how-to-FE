import React from 'react';
import Guide from './Guide'

export default class Guides extends React.Component {

    render() {
        // if (this.props.guideSelected === false) {
            return (
                <div>
                    <h3>
                        Guides:
                    </h3>
                    
                    {this.props.guides.map(guide => (
                            <Guide key={guide.title} guide={guide} postSelected={this.props.postSelected} />
                    ))}
                </div>
            )
    // }
    // else {
    //     return <div></div>
    // }
}
}