import React, { Component } from 'react'
import '../assets/css/Timeline.css';
import twitterLogo from '../assets/icons/twitter.svg';
import ApiService from '../services/ApiService';
import Tweet from '../components/Tweet';
import { socket } from 'socket.io-client';

export default class Timeline extends Component {
    constructor(props) {
        super(props);

        this.state = { newTweet: '', tweets: [] };

        this.handleIputChange = this.handleIputChange.bind(this);
        this.handleNewtweet = this.handleNewtweet.bind(this);
    }

    async componentDidMount() {

        this.subscribeToEvents();

        const response = await ApiService.get('tweets')
            .catch(error => console.log(error));

        this.setState({ tweets: response.data });
    }


    handleIputChange(event) {
        this.setState({ newTweet: event.target.value });
    }

    subscribeToEvents = () => {
        let io = require('socket.io-client')("http://127.0.0.1:8001");

        io.on('tweet', data => {
            this.setState({ tweets: [data, ...this.state.tweets] })
        })
        io.on('like', data => {
            this.setState({
                tweets: this.state.tweets.map(tw =>
                    tw._id === data._id ? data : tw)
            })
        })
    }

    async handleNewtweet(event) {

        if (event.keyCode !== 13)
            return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@OnWeek-Twitter:username');

        await ApiService.post('tweets', { content, author });

        this.setState({ newTweet: '' });
    }

    renderTweets() {
        return (
            <ul className="tweet-list">
                {this.state.tweets.map(t => (
                    <Tweet key={t._id} tweet={t} />
                ))}
            </ul>
        );
    }

    render() {
        return (
            <div className='timeline-wrapper'>
                <img height={24} src={twitterLogo} alt="Twitterlogo" />
                <form>
                    <textarea
                        value={this.state.newTweet}
                        onChange={this.handleIputChange}
                        onKeyDown={this.handleNewtweet}
                        placeholder="O que está acontecendo?"
                    />
                </form>

                {this.renderTweets()}

            </div>
        );
    }
}