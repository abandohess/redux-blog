import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createPost } from '../actions';
import uploadImage from '../../s3';

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      tags: '',
      content: '',
      cover_url: '',
      preview: '',
      file: {},
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onCoverChange = this.onCoverChange.bind(this);
    this.onImageUpload = this.onImageUpload.bind(this);
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

  onImageUpload(event) {
    const file = event.target.files[0];
    // Handle null file
    // Get url of the file and set it to the src of preview
    console.log(file);
    if (file) {
      this.setState({
        preview: window.URL.createObjectURL(file),
        file,
      });
    }
  }

  render() {
    return (
      <div className="new-post-container">
        <div className="create-post-text">Create a New Post</div>
        <img id="preview" alt="preview" src={this.state.preview} />
        <input type="file" name="coverImage" onChange={this.onImageUpload} />
        <input className="input-bar" placeholder="title" onChange={this.onTitleChange} value={this.state.title} />
        <input className="input-bar" placeholder="content" onChange={this.onContentChange} value={this.state.content} />
        <input className="input-bar" placeholder="tags" onChange={this.onTagsChange} value={this.state.tags} />
        <br />
        <div className="new-post-button-container">
          <div
            className="button -green center"
            onClick={() => {
              if (this.state.file) {
                uploadImage(this.state.file).then((url) => {
                  this.setState({
                    cover_url: url,
                  }, () => {
                    this.props.createPost(this.state, this.props.history);
                  });
                  // use url for content_url and
                  // either run your createPost actionCreator
                  // or your updatePost actionCreator
                }).catch((error) => {
                  // handle error
                });
              }
            }}
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
