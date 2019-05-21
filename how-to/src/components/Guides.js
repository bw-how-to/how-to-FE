import React from 'react';
import Guide from './Guide'
import { withRouter } from 'react-router-dom'

class Guides extends React.Component {

    guidesTemp = []
    
    componentDidMount = () => {
        console.log('inside Guides', this.props)
    }

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

export default withRouter(Guides);