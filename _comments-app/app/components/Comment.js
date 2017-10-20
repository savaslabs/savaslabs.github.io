import React from 'react';
import PropTypes from 'prop-types';

function Comment (props) {

  return (
    <li className={props.class}>
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

export default Comment;
