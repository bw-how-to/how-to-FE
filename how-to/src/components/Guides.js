import React from 'react';
import axios from 'axios';

export default class Guides extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            guides: [],
        }
    }


    componentDidMount() {
        const token = localStorage.getItem('jwt')
        const requestConfig = {
            headers: {
                 authorization: token
            }
        }

        axios
        .get('https://bw-how-to.herokuapp.com/guides', requestConfig)
        .then(res => this.setState({guides: res.data}))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h3>
                    guides
                </h3>
                {this.state.guides.map(guide => (
                    <div>
                        <p key={guide.id}>{guide.username}</p>
                    </div>
                ))}
            </div>
        )
    }
}