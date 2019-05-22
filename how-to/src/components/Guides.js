import React from 'react';
import Guide from './Guide'
import { withRouter } from 'react-router-dom'
import './Guides.scss'

class Guides extends React.Component {

    guidesTemp = []
    
    // componentDidMount = () => {
    //     console.log('inside Guides', this.props)
    // }

    render() {
        if (this.props.fetchingData === false) {
            return (
                <div className='guides'>
                    <h3>
                        Guides:
                    </h3>
                    {!this.props.filteredPosts.length > 0 && this.props.filteredPosts === true ? (
                        <div>
                            {this.props.guides.map(guide => (
                            <Guide key={guide.title} guide={guide} postSelected={this.props.postSelected} />
                    ))}
                        </div>
                    ) : (
                        <div>
                            {this.props.filteredPosts.map(guide => (
                            <Guide key={guide.title} guide={guide} postSelected={this.props.postSelected} />
                    ))}
                        </div>
                    )}

                </div>
            )
        }   
        else {
            return <div>Loading...</div>
        }
    }
}

export default withRouter(Guides);