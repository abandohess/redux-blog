import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Posts from '../containers/Posts';
import NewPost from '../containers/NewPost';
import Post from './Post';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import requireAuth from '../containers/RequireAuth';

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={requireAuth(NewPost)} />
          <Route path="/posts/:postID" component={Post} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
