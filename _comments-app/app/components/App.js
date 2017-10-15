import React from 'react';
import Comments from  './Comments';
import CommentForm from './CommentForm';

class App extends React.Component {
  render () {
    return (
      <div className="comments">
        <p>Hello World</p>
        <CommentForm />
        <Comments />
      </div>
    )
  }
}

export default App;