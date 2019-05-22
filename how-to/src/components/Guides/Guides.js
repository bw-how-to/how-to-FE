import React from 'react';
import Guide from './Guide'
import { withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'
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
            return ( 
                <div className='guides loader'>
                    <Loader 
                    type="Puff"
                    color="white"
                    height="100"	
                    width="100"
                    />   
                </div>
            )
        }
    }
}

export default withRouter(Guides);