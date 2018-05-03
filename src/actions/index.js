import axios from 'axios';

const ROOT_URL = 'https://cs52-blog-andy.herokuapp.com/api';
// const ROOT_URL = 'http://localhost:9090/api';
const API_KEY = '?key=a_bando-hess';

export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  // UPDATE_POST: 'UPDATE_POST',
  // CREATE_POST: 'CREATE_POST',
  DELETE_POST: 'DELETE_POST',
};


export function fetchPosts() {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      console.log(response);
      dispatch({ type: 'FETCH_POSTS', payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function createPost(post, history) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts${API_KEY}`, post).then((response) => {
      history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function updatePost(id, post) {
  const fields = {
    title: post.title, content: post.content, tags: post.tags, cover_url: post.cover_url,
  };
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}${API_KEY}`, fields).then((response) => {
      dispatch({ type: 'UPDATE_POST', payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function fetchPost(id, callback) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      callback(response.data);
      dispatch({ type: 'FETCH_POST', payload: response.data });
    }).catch((error) => {
      console.log(error);
    });
  };
}

export function deletePost(id, history) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`).then((response) => {
      history.push('/');
    }).catch((error) => {
      console.log(error);
    });
  };
}
