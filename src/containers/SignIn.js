import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { signinUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    let displayedPassword = '';
    for (let i = 0; i < this.state.password.length; i += 1) {
      displayedPassword += '*';
    }
    return (
      <div className="new-post-container">
        <div className="create-post-text">Sign In</div>
        <input className="input-bar" placeholder="email" onChange={this.onEmailChange} value={this.state.email} />
        <input className="input-bar" placeholder="password" onChange={this.onPasswordChange} value={displayedPassword} />
        <br />
        <div className="new-post-button-container">
          <div
            className="button -green center"
            onClick={() => { this.props.signinUser(this.state, this.props.history); }}
            role="button"
            tabIndex="0"
          >Sign in
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { signinUser })(SignIn));
