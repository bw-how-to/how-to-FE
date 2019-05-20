import React from 'react';
import { Redirect } from 'react-router-dom'

export default class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loggedIn: localStorage.getItem("jwt") === null ? false : true
          };
    }

    componentDidMount() {
        this.props.getGuides();
    }

    renderPost = () => {
        const formattedPosts = []
            this.props.guides.forEach((post) => {
                if (this.props.id === post.id || post.id === parseInt(this.props.match.params.id) ) {
                formattedPosts.push({username: post.username, title: post.title, description: post.description, step_1: post.step_1, step_2: post.step_2, step_3: post.step_3, step_4: post.step_4, step_5: post.step_5, step_6: post.step_6})
                console.log(post)
                }
            })
        return formattedPosts
    }

    render() {
        const post = this.renderPost()
        console.log('inside post', this.props)
        console.log('post', post)
        if (this.state.loggedIn === true ) {
            return (
                <div>
                    <h3>Post</h3>
                    {post.map(post => (
                        <div>
                            <p>{post.username}</p>
                            <div>{post.title}</div>
                            <div>{post.description}</div>
                            <div>{post.step_1}</div>
                            <div>{post.step_2}</div>
                            <div>{post.step_3}</div>
                            <div>{post.step_4}</div>
                            <div>{post.step_5}</div>
                            <div>{post.step_6}</div>
                        </div>
                    ))}
                </div>
            )
        }
        else {
            return ('Please Log In to continue')
        }
    }
}