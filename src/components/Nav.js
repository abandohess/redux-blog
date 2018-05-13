import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signoutUser } from '../actions';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.renderSignInStuff = this.renderSignInStuff.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.signoutUser(this.props.history);
  }

  renderSignInStuff() {
    console.log('auth', this.props.authenticated);
    if (this.props.authenticated) {
      return (
        <div role="button" tabIndex={0} className="button -orange center" onClick={this.signOut}>Sign Out</div>
      );
    } else {
      return (
        <div>
          <NavLink className="button -orange center" to="/signin">Sign In</NavLink>
          <NavLink className="button -orange center" to="/signup">Sign Up</NavLink>
        </div>
      );
    }
  }

  render() {
    return (
      <nav>
        <div className="menu-container">
          <NavLink className="button -green center" exact to="/">Home</NavLink>
          <NavLink className="button -orange center" to="/posts/new">New Post</NavLink>
          {this.renderSignInStuff()}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => (
  {
    authenticated: state.auth.authenticated,
  }
);

export default withRouter(connect(mapStateToProps, { signoutUser })(Nav));
