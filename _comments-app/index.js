import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import CommentCount from './components/CommentCount';

// Attach comments section to the DOM.
ReactDOM.render(
  <App />,
  document.getElementById('js-comments')
);

// Attach comment count to the DOM.
ReactDOM.render(
  <CommentCount />,
  document.getElementById('js-comment-count')
);
