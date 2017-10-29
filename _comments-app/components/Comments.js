import React, {Component} from 'react';
import api from '../utils/api';
import PropTypes from 'prop-types';
import Message from './Message';

function CommentFormLink (props) {
  'use strict';

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
};

function Comment (props) {
  return (
    <li className={props.class}>
      {props.savasian === "1" && <img src="/assets/img/logo.svg" className="comment__logo" alt="Savas Labs logo" />}
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
};

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: null,
      loading: true,
      hideMessage: false
    };

    this.loadComments = this.loadComments.bind(this);
  }
  loadComments() {
    api.getComments().then(function (response) {
      if (response) {
        this.setState(function () {
          return {
            comments: response,
            loading: false
          }
        });
      }
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

      // Remove success message after 10 seconds.
      this.timer = setTimeout(_ => {
        this.setState({ hideMessage: true });
      }, 10000);
    }
  }
  render () {
    // While API call is made, show loading text.
    const loading = this.state.loading;
    if (loading === true) {
      return null;
    }

    // Once we have comments, display the Comment components.
    const comments = this.state.comments.data;
    return (
      <div>
        {comments.length !== 0 && <CommentFormLink onClick={this.props.showCommentForm} />}
        <ul className="comments__list">
          {comments.map(function (comment, index) {
            let commentClass = 'comment';
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
        {this.props.newComment &&
        <Message
          type='success'
          message='Thanks for submitting your comment!'
          hide={this.state.hideMessage}
        />}
      </div>
    )
  }
}

export default Comments;
