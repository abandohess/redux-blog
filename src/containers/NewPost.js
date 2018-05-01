import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../actions';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      content: '',
      cover_url: '',
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onCoverChange = this.onCoverChange.bind(this);
  }

  onTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  onTagsChange(event) {
    this.setState({ tags: event.target.value });
  }

  onContentChange(event) {
    this.setState({ content: event.target.value });
  }

  onCoverChange(event) {
    this.setState({ cover_url: event.target.value });
  }

  render() {
    return (
      <div className="new-post-container">
        <div className="create-post-text">Create a New Post</div>
        <input className="input-bar" placeholder="title" onChange={this.onTitleChange} value={this.state.title} />
        <input className="input-bar" placeholder="content" onChange={this.onContentChange} value={this.state.content} />
        <input className="input-bar" placeholder="tags" onChange={this.onTagsChange} value={this.state.tags} />
        <input className="input-bar" placeholder="cover_url" onChange={this.onCoverChange} value={this.state.cover_url} />
        <br />
        <div className="new-post-button-container">
          <div
            className="button -green center"
            onClick={() => this.props.createPost(this.state, this.props.history)}
            role="button"
            tabIndex="0"
          >Create
          </div>
          <div
            className="button -orange center"
            onClick={() => this.props.history.push('/')}
            role="button"
            tabIndex="0"
          >Cancel
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, { createPost })(NewPost));
