import React from 'react';
import PropTypes from 'prop-types';

function Message (props) {
  'use strict';
  let className = 'message flash-' + props.type;
  if (props.hide === true) {
    className += ' hide';
  }
  return (
    <div className={className}>
      {props.message}
    </div>
  )
}

Message.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  hide: PropTypes.bool
};

export default Message;