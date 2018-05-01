import { ActionTypes } from '../actions';

const PostReducer = (
  state = { all: [], post: {} },
  action,
) => {
  switch (action.type) {
    case ActionTypes.FETCH_POST:
      return Object.assign({}, state, { post: action.payload });
    case ActionTypes.FETCH_POSTS:
      return Object.assign({}, state, { all: action.payload });
    case ActionTypes.UPDATE_POST:
      return Object.assign({}, state, { post: action.payload });
    default:
      return state;
  }
};

export default PostReducer;
