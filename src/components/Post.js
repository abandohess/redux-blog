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
      // isTagsEditing: false,
      // isCoverURLEditing: false,
      title: '',
      tags: '',
      content: '',
      cover_url: '',
    };

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onTitleFocus = this.onTitleFocus.bind(this);
    this.onTitleBlur = this.onTitleBlur.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onContentFocus = this.onContentFocus.bind(this);
    this.onContentBlur = this.onContentBlur.bind(this);
    this.onTagsChange = this.onTagsChange.bind(this);
    this.onTagsFocus = this.onTagsFocus.bind(this);
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

  onTitleFocus() {
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

  onContentFocus() {
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

  onTagsFocus() {
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
    return (
      <div className="post-container-container">
        <div className="post-container">
          <img src={this.props.posts.post.cover_url} alt="" className="rounded-picture" />
          { this.state.isTitleEditing ?
            <input onBlur={this.onTitleBlur} onChange={this.onTitleChange} value={this.state.title} /> :
            <div role="button" tabIndex={0} onClick={this.onTitleFocus} dangerouslySetInnerHTML={{ __html: marked(this.state.title || '') }} />
          }
          { this.state.isContentEditing ?
            <input onChange={this.onContentChange} onBlur={this.onContentBlur} value={this.state.content} /> :
            <div role="button" tabIndex={0} onClick={this.onContentFocus} dangerouslySetInnerHTML={{ __html: marked(this.state.content || '') }} />
          }
          { this.state.isTagsEditing ?
            <input onChange={this.onTagsChange} onBlur={this.onTagsBlur} value={this.state.tags} /> :
            <div role="button" tabIndex={0} onClick={this.onTagsFocus} dangerouslySetInnerHTML={{ __html: marked(this.state.tags || '') }} />
          }
        </div>
        <div className="post-menu-container">
          <div
            className="button -green center"
            onClick={() => {
              console.log('deleting id', this.props.match.params.postID);
              this.props.deletePost(this.props.match.params.postID, this.props.history);
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
  }
);

export default withRouter(connect(mapStateToProps, { fetchPost, deletePost, updatePost })(Post));
