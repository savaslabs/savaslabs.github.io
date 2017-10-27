import axios from 'axios';

// TODO: Update this to use Jekyll variable.
const commentServer = 'http://local.comments.savaslabs.com';
const postSlug = window.location.pathname;

// Remove leading forward slash.
const truncatedSlug = postSlug.substring(1, postSlug.length);
const encodedSlug = encodeURIComponent(truncatedSlug);
const requri = commentServer + '/api/comments/post?slug=' + encodedSlug;

module.exports = {
  getComments: function () {
    'use strict';
    return axios.get(requri)
      .then(function (json) {
        return json.data;
      });
  },
  postComment: function (commentData) {
    'use strict';
    return axios({
      method: 'post',
      url: 'http://local.comments.savaslabs.com/api/comments/new',
      data: commentData
    })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  }
};
