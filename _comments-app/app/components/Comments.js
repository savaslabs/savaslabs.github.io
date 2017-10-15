import React from 'react';
import Comment from './Comment';

class Comments extends React.Component {
  render () {
    return (
      <div>
        <p>Comments go here</p>
        <Comment />
      </div>
    )
  }
}

export default Comments;
