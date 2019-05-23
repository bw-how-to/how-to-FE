import React from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import './Guides.scss'

export default class Post extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            loggedIn: localStorage.getItem("jwt") === null ? false : true,
            videoLoaded: false
          };
    }

    handleUsernameClick = (e) => {
        this.props.history.push(`/guides/users/${e.target.innerHTML}`)
    }

    renderPost = () => {
        const formattedPosts = []
            this.props.guides.forEach((post) => {
                if (this.props.id === post.id || post.id === parseInt(this.props.match.params.id) ) {
                formattedPosts.push({username: post.username, title: post.title, description: post.description, step_1: post.step_1, step_2: post.step_2, step_3: post.step_3, step_4: post.step_4, step_5: post.step_5, post_id: post.id, link: post.link })
                }
            })
        return formattedPosts
    }

    videoReady = (e) => {
        console.log(e)
        this.setState({videoLoaded: true})
        document.querySelector(".guide").classList.toggle('hidden')
        document.querySelector(".guideSpinner").classList.toggle('hidden')
    }

    editPost = () => {
        const post = this.renderPost()
        this.props.editPost(post[0])
        this.props.history.push('/editguide')
    }

    deletePost = () => {
        const token = localStorage.getItem('jwt')
        const requestConfig = {
            headers: {
                 authorization: token
            }
        }
    
        if (token) {
          axios
          .delete(`https://bw-how-to.herokuapp.com/guides/${this.props.match.params.id}`, requestConfig)
          .then(res => {
              console.log(res)
              this.props.history.push('/guides')
              this.props.getGuides()
            })
          .catch(err => console.log(err))
          }
      }

    render() {
        const post = this.renderPost()
        if (this.state.loggedIn === true ) {
            return (
                <div className="guideContainer">
                    <div className='guide hidden'>
                        {post.map(post => (
                            <div key={post.post_id}>
                                <h3>{post.title}</h3>
                                <div className='username' onClick={this.handleUsernameClick}>{post.username}</div>
                                <div className='description'>{post.description}</div>
                                <div className='video'>
                                    <ReactPlayer onReady={this.videoReady} className='reactVideo' url={post.link} width='100%' height='100%' controls />
                                </div>

                                {post.step_1 ? (
                                    <div className='step'><strong>Step 1:</strong> {post.step_1}</div>
                                    ) : (
                                    <span></span>
                                )}

                                {post.step_2 ? (
                                    <div className='step'><strong>Step 2:</strong> {post.step_2}</div>
                                    ) : (
                                    <span></span>
                                )}

                                {post.step_3 ? (
                                    <div className='step'><strong>Step 3:</strong> {post.step_3}</div>
                                    ) : (
                                    <span></span>
                                )}

                                {post.step_4 ? (
                                    <div className='step'><strong>Step 4:</strong> {post.step_4}</div>
                                    ) : (
                                    <span></span>
                                )}

                                {post.step_5 ? (
                                    <div className='step'><strong>Step 5:</strong> {post.step_5}</div>
                                    ) : (
                                    <span></span>
                                )}

                                {this.props.user_type === 'creator' && this.props.username === post.username ? (
                                    <div>
                                        <button onClick={this.editPost}>Edit</button>
                                        <button onClick={this.deletePost}>Delete</button>
                                    </div>
                                    ) : (
                                        <span></span>
                                    )}
                            </div>
                        ))}
                    </div>
                    <div className='guideSpinner'>
                        <Loader 
                        type="Puff"
                        color="white"
                        height="100"	
                        width="100"
                        /> 
                    </div>
                </div>
            )      
                                
        }
        else {
            return ('Please Log In to continue')
        }
    }
}