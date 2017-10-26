import React from 'react';
import api from '../utils/api';
import qs from 'qs';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      comment: '',
      url: '',
      nocaptcha: '',
      slug: window.location.pathname
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();

    // Submit a POST request to the comments server.
    var commentData = qs.stringify(this.state);
    api.postComment(commentData).then(function (response) {

      // Update state of App so Comments list will refresh.
      this.props.refreshComments();

      // Hide the comment form.
      this.props.hideCommentForm();
    }.bind(this));

  }
  handleChange(event) {
    // Update state for the changed input.
    const state = this.state
    state[event.target.name] = event.target.value;
    this.setState(state);
  }
  render () {
    const { name, email, comment, url, nocaptcha, slug } = this.state;
    return (
      <form id="form--comment" className="form--comment" onSubmit={this.handleSubmit}>
        <div className="form--comment__row">
          <div className="form--comment__row__item">
            <div className="form--comment__field form--comment__field--name">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={name} onChange={this.handleChange} required />
            </div>
            <div className="form--comment__field form--comment__field--email">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" value={email} onChange={this.handleChange} required />
              <p className="form--comment__helptext">Savas Labs will never sell your email address or spam you.</p>
            </div>
          </div>
          <div className="form--comment__field form--comment__field--comment form--comment__row__item">
            <label htmlFor="comment">Comment</label>
            <textarea name="comment" id="comment" value={comment} onChange={this.handleChange} rows="4" required></textarea>
            <p className="form--comment__helptext">Plain text format only please.</p>
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
              <label htmlFor="nocaptcha">What type of animal is the Savas Labs logo?</label>
              <p className="form--comment__helptext">Hint: 3 letters long, starts with an "o" and ends with an "l".</p>
              <input type="text" name="nocaptcha" id="nocaptcha" value={nocaptcha} onChange={this.handleChange} required />
            </div>
          </div>
          <div className="form--comment__row__item">
            <input type="submit" value="Post comment" id="submit" className="form--comment__submit" />
          </div>
        </div>
      </form>
    )
  }
}

export default CommentForm;
