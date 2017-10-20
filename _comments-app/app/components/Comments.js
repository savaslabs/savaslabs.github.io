import React from 'react';
import api from '../utils/api';
import Comment from './Comment';

function CommentFormLink () {
  return (
    <a
      href="#form--comment"
      id="region--comments__link"
      className="region--comments__link link--inline">
      Leave a comment
    </a>
  )
}

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: null,
      loading: true
    }
  }
  componentDidMount() {
    api.getComments().then(function (data) {
      this.setState(function () {
        return {
          comments: data,
          loading: false
        }
      });
    }.bind(this));
  }
  render () {
    var loading = this.state.loading;
    if (loading === true) {
      return (
        <p>Loading...</p>
      )
    }

    var comments = this.state.comments.data;
    return (
      <div>
        {comments ? <CommentFormLink /> : null}
        <ul className="comments__list">
          {comments.map(function (comment, index) {
            var commentClass = 'comment';
            if (comment.savasian === 1) {
              commentClass = 'comment savasian';
            }
            return (
              <Comment
                key={index}
                class={commentClass}
                savasian={comment.savasian}
                name={comment.name}
                date={comment.created_at}
                comment={comment.comment}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Comments;
