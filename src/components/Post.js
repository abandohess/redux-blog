import marked from 'marked';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { fetchPost, deletePost, updatePost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props);
    console.log('constructor', props);
    this.state = {
      isTitleEditing: false,
      isContentEditing: false,
      isTagsEditing: false,
      title: '',
      tags: '',
      content: '',
      cover_url: '',
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTitleClick = this.onTitleClick.bind(this);
    this.onTitleBlur = this.onTitleBlur.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onContentClick = this.onContentClick.bind(this);
    this.onContentBlur = this.onContentBlur.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onTagsClick = this.onTagsClick.bind(this);
    this.onTagsBlur = this.onTagsBlur.bind(this);
  }

  componentDidMount() {
    this.props.fetchPost(this.props.match.params.postID, (data) => {
      this.setState({
        title: data.title,
        tags: data.tags,
        content: data.content,
        cover_url: data.cover_url,
      });
    });
  }

  onTitleChange(event) {
    this.setState({
      title: event.target.value,
    });
  }

  onTitleClick() {
    this.setState({
      isTitleEditing: !this.state.isTitleEditing,
    });
  }

  onTitleBlur(event) {
    this.setState({
      isTitleEditing: !this.state.isTitleEditing,
    });
    this.props.updatePost(this.props.match.params.postID, this.state);
  }

  onContentChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  onContentClick() {
    this.setState({
      isContentEditing: !this.state.isContentEditing,
    });
  }

  onContentBlur(event) {
    this.setState({
      isContentEditing: !this.state.isContentEditing,
    });
    this.props.updatePost(this.props.match.params.postID, this.state);
  }

  onTagsChange(event) {
    this.setState({
      tags: event.target.value,
    });
  }

  onTagsClick() {
    this.setState({
      isTagsEditing: !this.state.isTagsEditing,
    });
  }

  onTagsBlur(event) {
    this.setState({
      isTagsEditing: !this.state.isTagsEditing,
    });
    this.props.updatePost(this.props.match.params.postID, this.state);
  }

  render() {
    console.log(this.props.posts.post);
    return (
      <div className="post-container-container">
        <div className="post-container">
          <img src={this.props.posts.post.cover_url} alt="" className="rounded-picture" />
          { this.state.isTitleEditing ?
            <input onBlur={this.onTitleBlur} onChange={this.onTitleChange} value={this.state.title} /> :
            <div role="button" tabIndex={0} onClick={this.onTitleClick} dangerouslySetInnerHTML={{ __html: marked(this.state.title || '') }} />
          }
          { this.state.isContentEditing ?
            <input onChange={this.onContentChange} onBlur={this.onContentBlur} value={this.state.content} /> :
            <div role="button" tabIndex={0} onClick={this.onContentClick} dangerouslySetInnerHTML={{ __html: marked(this.state.content || '') }} />
          }
          { this.state.isTagsEditing ?
            <input onChange={this.onTagsChange} onBlur={this.onTagsBlur} value={this.state.tags} /> :
            <div role="button" tabIndex={0} onClick={this.onTagsClick} dangerouslySetInnerHTML={{ __html: marked(this.state.tags || '') }} />
          }
          <div dangerouslySetInnerHTML={{ __html: marked(`Author: ${this.props.posts.post.username}` || '') }} />
        </div>
        <div className="post-menu-container">
          <div
            className="button -green center"
            onClick={() => {
              if (this.props.authenticated) {
                this.props.deletePost(this.props.match.params.postID, this.props.history);
              } else {
                alert('You may not delete a post before signing in');
              }
            }}
            role="button"
            tabIndex="0"
          >Delete
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts,
    authenticated: state.auth.authenticated,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post));
