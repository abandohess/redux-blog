import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
// import Nav from './Nav';
import Posts from '../containers/Posts';
import NewPost from '../containers/NewPost';
import Post from './Post';

const Nav = (props) => {
  return (
    <nav>
      <div className="menu-container">
        <NavLink className="button -green center" to="/">Home</NavLink>
        <NavLink className="button -orange center" to="/posts/new">New Post</NavLink>
      </div>
    </nav>
  );
};

const App = (props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Posts} />
          <Route path="/posts/new" component={NewPost} />
          <Route path="/posts/:postID" component={Post} />
          <Route render={() => (<div>post not found </div>)} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
