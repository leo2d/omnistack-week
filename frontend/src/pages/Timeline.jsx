import React, { Component } from 'react'
import '../assets/css/Timeline.css';
import twitterLogo from '../assets/icons/twitter.svg';

export default class Timeline extends Component {
    constructor(props) {
        super(props);

        this.state = { newTweet: '', tweeets: [] };

        this.handleIputChange = this.handleIputChange.bind(this);
        this.handleNewtweet = this.handleNewtweet.bind(this);
    }

    handleIputChange(event) {
        this.setState({ newTweet: event.target.value });
    }

    handleNewtweet(event) {

        if (event.keyCode !== 13)
            return;

        const content = this.state.newTweet;
        const author = localStorage.getItem('@OnWeek-Twitter:username');

        console.log(`tweet => ${content} \n author => ${author}`);
    }

    render() {
        return (
            <div className='timeline-wrapper'>
                <img height={24} src={twitterLogo} alt="Twitterlogo" />
                <form>
                    <textarea
                        value={this.newTweet}
                        onChange={this.handleIputChange}
                        onKeyDown={this.handleNewtweet}
                        placeholder="O que está acontecendo?"
                    />
                </form>

            </div>
        );
    }
}