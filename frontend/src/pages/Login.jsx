import React, { Component } from 'react'

import '../assets/css/Login.css';
import twitterLogo from '../assets/icons/twitter.svg';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = { userName: '', password: '' }

        this.updateUserName = this.updateUserName.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateUserName(event) {
        this.setState({ userName: event.target.value });
    }
    updatePassword(event) {
        this.setState({ password: event.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();

        const { userName } = this.state;

        if (!userName.length)
            return;

        localStorage.setItem('@OnWeek-Twitter:username', userName);

        this.props.history.push('/timeline');
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="Twitterlogo" />
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Nome de usuário" value={this.state.userName} onChange={this.updateUserName} />
                    <input type="password" placeholder="senha" value={this.state.password} onChange={this.updatePassword} />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}