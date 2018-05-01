// import createAbsoluteGrid from 'react-absolute-grid';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { fetchPosts } from '../actions';
import GridPost from '../components/GridPost';

class Posts extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    return (
      <div className="grid-posts-container">
        { this.props.posts.all.map((post) => {
            return (
              <Link to={`/posts/${post.id}`} key={post.id} >
                <GridPost title={post.title} content={post.content} cover_url={post.cover_url} tags={post.tags} />
              </Link>);
          }) }
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    posts: state.posts,
  }
);

export default withRouter(connect(mapStateToProps, { fetchPosts })(Posts));
