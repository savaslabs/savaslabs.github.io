import React from 'react';
import api from '../utils/api';
import PropTypes from 'prop-types';

function CommentFormLink (props) {
  // On click, we'll make sure the comment form is rendered.
  return (
    <a
      href="#form--comment"
      id="region--comments__link"
      className="region--comments__link link--inline"
      onClick={props.onClick}>
      Leave a comment
    </a>
  )
}

CommentFormLink.propTypes = {
  onClick: PropTypes.func.isRequired
}

function Comment (props) {
  return (
    <li className={props.class}>
      {props.savasian == 1 && <img src="/assets/img/logo.svg" className="comment__logo" alt="Savas Labs logo" />}
      <p className="comment__name"><span className="c-magenta">{props.name}</span> says:</p>
      <p className="comment__date">{props.date}</p>
      <p className="comment__text">{props.comment}</p>
    </li>
  )
}

Comment.propTypes = {
  savasian: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired
}

class Comments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: null,
      loading: true,
      newComment: false
    }

    this.loadComments = this.loadComments.bind(this);
  }
  loadComments() {
    api.getComments().then(function (data) {
      this.setState(function () {
        return {
          comments: data,
          loading: false
        }
      });
    }.bind(this));
  }
  componentDidMount() {
    this.loadComments();
  }
  componentWillReceiveProps(newProps) {
    // This will trigger when a new comment is posted.
    // Comments list will be re-rendered and will include the new comment.
    if (newProps.newComment === true) {
      this.loadComments();
    }
  }
  render () {
    // While API call is made, show loading text.
    var loading = this.state.loading;
    if (loading === true) {
      return (
        <p>Loading...</p>
      )
    }

    // Once we have comments, display the Comment components.
    var comments = this.state.comments.data;
    return (
      <div>
        {comments && <CommentFormLink onClick={this.props.showCommentForm} />}
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
