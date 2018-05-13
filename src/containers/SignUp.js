import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    let displayedPassword = '';
    for (let i = 0; i < this.state.password.length; i += 1) {
      displayedPassword += '*';
    }
    return (
      <div className="new-post-container">
        <div className="create-post-text">Sign Up</div>
        <input className="input-bar" placeholder="username" onChange={this.onUsernameChange} value={this.state.username} />
        <input className="input-bar" placeholder="email" onChange={this.onEmailChange} value={this.state.email} />
        <input className="input-bar" placeholder="password" onChange={this.onPasswordChange} value={displayedPassword} />
        <br />
        <div className="new-post-button-container">
          <div
            className="button -green center"
            onClick={() => { this.props.signupUser(this.state, this.props.history); }}
            role="button"
            tabIndex="0"
          >Sign Up
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { signupUser })(SignUp));
