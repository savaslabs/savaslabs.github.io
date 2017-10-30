import React, {Component} from 'react';
import api from '../utils/api';

class CommentCount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0
    };
  }
  componentDidMount() {
    api.getComments().then(function (data) {
      if (data) {
        this.setState({ count: data.data.length });
      }
    }.bind(this));
  }
  render () {
    if (this.state.count > 0) {
      return (
        <a href="#js-comments">
          <i className="fa fa-comment"></i>
          {this.state.count} comments
        </a>
      );
    }
    return null;
  }
}

export default CommentCount;
