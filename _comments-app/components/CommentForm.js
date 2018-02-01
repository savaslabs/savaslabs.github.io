import React, {Component} from 'react';
import api from '../utils/api';
import PropTypes from 'prop-types';
import qs from 'qs';
import Message from './Message';

class CommentForm extends Component {

  constructor(props) {
    super(props);

    // @todo: Issue #2648: Remove nocaptcha field entirely.
    this.state = {
      name: '',
      email: '',
      comment: '',
      url: '',
      nocaptcha: 'owl',
      slug: window.location.pathname,
      error: false,
      errorField: null,
      message: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();

    // Submit a POST request to the comments server.
    const commentData = qs.stringify(this.state);
    api.postComment(commentData).then(function (response) {
      /**
       * @param response
       * @param response.data.array_member[].data
       * @param response.data.data.array_member[].error_field
       */
      if (response.data.success === true) {
        // Update state of App so Comments list will refresh.
        this.props.refreshComments();

        // Hide the comment form.
        this.props.hideCommentForm();
      } else {
        // Set error message and error field.
        this.setState(function () {
          return {
            error: true,
            errorField: response.data.data.error_field,
            message: response.data.message
          };
        });
      }

    }.bind(this));

  }
  handleChange(event) {
    // Update state for the changed input.
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  render () {
    const { name, email, comment, url } = this.state;

    let commentClasses = (this.state.errorField === 'comment' ? 'error-field' : '');
    commentClasses = (comment !== '' ? commentClasses + 'has-text' : commentClasses);

    return (
      <form id="form--comment" className="form--comment" onSubmit={this.handleSubmit}>
        {this.state.error && <Message type='error' message={this.state.message} />}

        <div className="form--comment__helptext">
          <p>Savas Labs will never sell your email address or spam you.</p>
          <p>Plain text format only please.</p>
        </div>

        <div className="form--comment__wrapper">
          <div className="form--comment__column--left">
            <div className="form--comment__field form--comment__field--comment">
              <label htmlFor="comment" className="sr-only">Comment</label>
              <textarea
                name="comment"
                id="comment"
                className={commentClasses}
                value={comment}
                onChange={this.handleChange}
                rows="4"
                placeholder="Leave a comment..."
                required >
              </textarea>
            </div>
          </div>

          <div className="form--comment__column--right">
            <div className="form--comment__field form--comment__field--name">
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className={(this.state.errorField === 'name' ? 'error-field' : '')}
                value={name}
                onChange={this.handleChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="form--comment__field form--comment__field--email">
              <label htmlFor="email" className="sr-only">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                className={(this.state.errorField === 'email' ? 'error-field' : '')}
                value={email}
                onChange={this.handleChange}
                placeholder="E-mail"
                required
              />
            </div>

            <label htmlFor="url" className="sr-only">
              If you are a human, do not fill out this field.
            </label>
            <input
              type="text"
              name="url"
              id="url"
              className="form--comment__field--url"
              value={url}
              onChange={this.handleChange}
            />

            <div className="form--comment__actions">
              <input
                type="submit"
                value="POST"
                id="submit"
                className="form--comment__actions--submit"
              />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

CommentForm.propTypes = {
  refreshComments: PropTypes.func.isRequired,
  hideCommentForm: PropTypes.func.isRequired,
};

export default CommentForm;
