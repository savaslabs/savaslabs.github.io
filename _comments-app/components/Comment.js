import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Gravatar from 'react-gravatar';

class Comment extends Component {
  /**
   * Convert encoded HTML before displaying a comment.
   *
   * @param commentText
   */
  static decodeHtml(commentText) {
    const parser = new DOMParser;
    const dom = parser.parseFromString(
      '<!doctype html><body>' + commentText,
      'text/html');
    return dom.body.textContent;
  }

  render () {
    const commentText = Comment.decodeHtml(this.props.comment);
    return (
      <li className={this.props.class}>
        <div className="comment__avatar">
          <div className="comment__avatar--image">
            <Gravatar md5={this.props.email} default="identicon" />
          </div>
          <div className="comment__avatar--bg"></div>
        </div>
        <div className="comment__content">
          <div className="comment__content--header">
            <div className="comment__content--header__name">{this.props.name}</div>
            <div className="comment__content--header__actions">
              <a href="#reply" title="Reply" aria-hidden="true"></a>
              <a href="#" title="Copy Permalink" aria-hidden="true"></a>
            </div>
          </div>
          <div className="comment__content--body">
            <div className="comment__content--body__text">{commentText}</div>
            <div className="comment__content--body__date">{this.props.date}</div>
          </div>
        </div>
      </li>
    );
  }
}

Comment.propTypes = {
  class: PropTypes.string.isRequired,
  savasian: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  email: PropTypes.string
};

export default Comment;
