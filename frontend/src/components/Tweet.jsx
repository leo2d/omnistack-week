import React, { Component } from 'react';
import '../assets/css/Tweet.css';
import like from '../assets/icons/like.svg';
import ApiService from '../services/ApiService'

export default class Tweet extends Component {

    async handleLike() {

        const { _id } = this.props.tweet;

        await ApiService.post(`likes/${_id}`)
            .catch(error => console.log(error));
    }

    render() {
        const { tweet } = this.props;
        return (
            <li className="tweet">
                <strong>{tweet.author}</strong>
                <p>{tweet.content}</p>
                <button type="button" onClick={() => this.handleLike()}>
                    <img src={like} alt="like" />
                    {tweet.likes}
                </button>
            </li>
        );
    }
}
