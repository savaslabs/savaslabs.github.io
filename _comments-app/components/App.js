import React, {Component} from 'react';
import Comments from './Comments';
import CommentForm from './CommentForm';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: true,
      newComment: false
    };

    this.handleNewComment = this.handleNewComment.bind(this);
    this.showCommentForm = this.showCommentForm.bind(this);
    this.hideCommentForm = this.hideCommentForm.bind(this);
  }
  handleNewComment() {
    this.setState(function () {
      return {
        newComment: true
      };
    });
  }
  showCommentForm() {
    this.setState({ showForm: true });
  }
  hideCommentForm() {
    this.setState({ showForm: false });
  }
  render () {
    return (
      <div className="comments-app">
        <h2 className="heading--sans-serif heading--bold h4 c-grey">Comments</h2>
        <div className="comments-app__wrapper region">
          {this.state.showForm &&
          <CommentForm
            refreshComments={this.handleNewComment}
            hideCommentForm={this.hideCommentForm}
          />
          }
          <Comments
            newComment={this.state.newComment}
            showCommentForm={this.showCommentForm}
          />
        </div>
      </div>
    );
  }
}

export default App;
