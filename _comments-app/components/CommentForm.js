import React, {Component} from 'react';
import api from '../utils/api';
import PropTypes from 'prop-types';
import qs from 'qs';

import Message from './Message';
import TextEditor from './TextEditor';

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      comment: '',
      url: '',
      nocaptcha: '',
      slug: window.location.pathname,
      error: false,
      errorField: null,
      message: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.setEditorState = this.setEditorState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    // Update state for the changed input.
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  setEditorState(editorState) {
    // We'll pass this function as a prop to the TextEditor component so when
    // the editorState is updated there, it'll be saved in the state here.
    this.setState({ editorState: editorState });
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
  render () {
    const { name, email, url, nocaptcha } = this.state;
    return (
      <form id="form--comment" className="form--comment" onSubmit={this.handleSubmit}>
        {this.state.error && <Message type='error' message={this.state.message} />}
        <div className="form--comment__row">
          <div className="form--comment__row__item">
            <div className="form--comment__field form--comment__field--name">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                className={this.state.errorField === 'name' && 'error-field'}
                value={name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form--comment__field form--comment__field--email">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className={this.state.errorField === 'email' && 'error-field'}
                value={email} onChange={this.handleChange}
                required
              />
              <p className="form--comment__helptext">Savas Labs will never sell your email address or spam you.</p>
            </div>
          </div>
          <div className="form--comment__field form--comment__field--comment form--comment__row__item">
            <label htmlFor="comment">Comment</label>
            <TextEditor setEditorState={this.setEditorState}/>
          </div>
        </div>

        <label htmlFor="url" className="sr-only">If you are a human, do not fill out this field.</label>
        <input type="text" name="url" id="url" value={url} onChange={this.handleChange} />

        <div className="form--comment__row">
          <div className="form--comment__field form--comment__field--nocaptcha form--comment__row__item">
            <div className="form--comment__field--nocaptcha__image">
              <img src="/assets/img/icons-and-logos/owl.png" alt="Savas Labs logo" />
            </div>
            <div className="form--comment__field--nocaptcha__input">
              <label htmlFor="nocaptcha">{'What type of animal is the Savas Labs logo?'}</label>
              <p className="form--comment__helptext">{'Hint: 3 letters long, starts with an "o" and ends with an "l".'}</p>
              <input
                type="text"
                name="nocaptcha"
                id="nocaptcha"
                className={this.state.errorField === 'nocaptcha' && 'error-field'}
                value={nocaptcha}
                onChange={this.handleChange}
                required
              />
            </div>
          </div>
          <div className="form--comment__row__item">
            <input type="submit" value="Post comment" id="submit" className="form--comment__submit" />
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
