import axios from 'axios';

// TODO: Update this to use Jekyll variable.
var commentServer = 'http://local.comments.savaslabs.com';
var postSlug = window.location.pathname;

// Remove leading forward slash.
var truncatedSlug = postSlug.substring(1, postSlug.length);
var encodedSlug = encodeURIComponent(truncatedSlug);
var requri = commentServer + '/api/comments/post?slug=' + encodedSlug;

module.exports = {
  getComments: function () {
    return axios.get(requri)
      .then(function (json) {
        return json.data;
      });
  },
  postComment: function (commentData) {
    return axios({
      method: 'post',
      url: 'http://local.comments.savaslabs.com/api/comments/new',
      data: commentData
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  }
};
