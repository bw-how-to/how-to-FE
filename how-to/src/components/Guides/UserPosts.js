import React from 'react';

export default class UserPosts extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loggedIn: localStorage.getItem("jwt") === null ? false : true
          };
    }

    filterByUser = () => {
        const userPosts = []
        this.props.guides.forEach((post) => {
            if (this.props.username === post.username || post.username === this.props.match.params.username) {
            userPosts.push({username: post.username, title: post.title, description: post.description, step_1: post.step_1, step_2: post.step_2, step_3: post.step_3, step_4: post.step_4, step_5: post.step_5, step_6: post.step_6, id: post.id})
            }
        })
    return userPosts
    }

    render() {
        const userPosts = this.filterByUser()
        if (this.state.loggedIn === true ) {
            return (
                <div>
                    {userPosts.map(post => (
                        <div key={post.id}>
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
