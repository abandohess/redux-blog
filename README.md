# CS52 Redux Blog

Anders Bando-Hess - April 2018

I built a blog platform with React+Redux+React-Router. It follows the Create+Update+Delete (CRUD) style and I unused an API server hosted at: cs52-blog.herokuapp.com.

The hardest part to implement was the Post container. I ended up passing a callback to fetchPost to set the Post's state only after the Post object had been fetched from the herokuapp server.
