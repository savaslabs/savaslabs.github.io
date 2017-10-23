import React from 'react';
import Comments from './Comments';
import CommentForm from './CommentForm';

class App extends React.Component {
  render () {
    return (
      <div className="comments-app">
        <h2 className="heading--sans-serif heading--bold h4 c-grey">Comments</h2>
        <div className="comments-app__wrapper region">
          <Comments />
          <CommentForm />
        </div>
      </div>
    )
  }
}

export default App;
