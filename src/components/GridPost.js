import React from 'react';

const GridPost = (props) => {
  return (
    <div className="grid-post-container" >
      <img src={props.cover_url} alt="filler" />
      <div className="grid-post-text-container">
        {props.title}
      </div>
      {props.content}
      {props.tags}
    </div>
  );
};

export default GridPost;
