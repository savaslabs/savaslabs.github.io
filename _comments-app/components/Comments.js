import React, {Component} from 'react';
import api from '../utils/api';
import PropTypes from 'prop-types';
import Comment from './Comment';
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
  );
}

CommentFormLink.propTypes = {
  onClick: PropTypes.func.isRequired
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
          };
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
      this.timer = setTimeout(function () {
        this.setState({ hideMessage: true });
      }.bind(this), 10000);
    }
  }
  render () {
    // While API call is made, show loading text.
    const loading = this.state.loading;
    if (loading === true) {
      return null;
    }

    // Once we have comments, display the Comment components.
    /**
     * @param comments
     * @param comments.array_member[].created_at
     */
    const comments = this.state.comments.data;
    if (comments.length === 0) {
      return null;
    }

    return (
      <div className="region--comments__comments">
        <CommentFormLink onClick={this.props.showCommentForm} />
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
            );
          })}
        </ul>
        {this.props.newComment &&
        <Message
          type='success'
          message='Thanks for submitting your comment!'
          hide={this.state.hideMessage}
        />}
      </div>
    );
  }
}

Comments.propTypes = {
  newComment: PropTypes.bool,
  showCommentForm: PropTypes.func,
};

export default Comments;
