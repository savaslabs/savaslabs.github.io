---
library: jquery-2.1.3.min.js
---

{% include_relative _lib/{{page.library}} %}

// MOBILE MENU.
$(document).ready(
    function () {
        var menuToggle = $('#js-mobile-menu').unbind();
        $('#js-navigation-menu').removeClass("show");

        menuToggle.on(
            'click', function (e) {
                e.preventDefault();
                $('#js-navigation-menu').slideToggle(
                    function () {
                        if ($('#js-navigation-menu').is(':hidden')) {
                            $('#js-navigation-menu').removeAttr('style');
                        }
                    });
            });
    });

// SMOOTH SCROLLING ON HOME PAGE.
// See https://css-tricks.com/snippets/jquery/smooth-scrolling/
$(document).ready(
    function () {
        $('a[href*="#"]:not([href="#"])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

// COMMENTS.
$(document).ready(
    function () {

        // Expandable comment section.
        $('#js-expander-trigger').click(function () {
            enableCommentForm('#js-expander-trigger');
        });


        $('#comment-count').click(function () {
            enableCommentForm('#comment-count');
        });
    });

// COMMENT COUNT.
$(document).ready(
    function () {

        // Create variable for request URI.
        var commentServer = "{{ site.comment_server_url }}";
        var postSlug = window.location.pathname;

        // Remove leading forward slash.
        var truncatedSlug = postSlug.substring(1, postSlug.length);
        var requri = commentServer + '/api/comments/count';
        $.getJSON(
            requri, function (json) {
                if (truncatedSlug in json.data[0]) {
                    var commentString = 'comments';
                    if (json.data[0][truncatedSlug] == 1) {
                        commentString = 'comment';
                    }
                    $("#comment-count").html('<a href="#js-expander-trigger"><i class="fa fa-comment"></i>' + json.data[0][truncatedSlug] + ' ' + commentString + '</a>');
                }
            });
    });

// COMMENT COUNT ON CARDS.
$(document).ready(
    function () {
        var commentServer = "{{ site.comment_server_url }}";
        var requri = commentServer + '/api/comments/count';
        $.getJSON(
            requri, function (json) {
                $(".card .url").each(function () {
                    var truncatedSlug = $(this).attr('href').substring(1, $(this).attr('href').length);
                    if (truncatedSlug in json.data[0]) {
                        var commentString = 'comments';
                        if (json.data[0][truncatedSlug] == 1) {
                            commentString = 'comment';
                        }
                        $(this).find(".comment-count").html('<a href="' + $(this).attr('href') + '">' + '<i class="fa fa-comment-o"></i>' + json.data[0][truncatedSlug] + ' ' + commentString + '</a>');
                    }
                    else {
                        $(this).find(".comment-count").remove();
                    }
                });
            });
    });

// Export comment functionality and include functionality for comment count button
function enableCommentForm($id) {
    if ($id == '#js-expander-trigger') {
        $('#js-expander-trigger').toggleClass("expander-hidden");
    }
    if ($id == '#comment-count') {
        $('#js-expander-trigger').removeClass("expander-hidden");
    }

    // Create variable for request URI.
    var commentServer = "{{ site.comment_server_url }}";
    var postSlug = window.location.pathname;

    // Remove leading forward slash.
    var truncatedSlug = postSlug.substring(1, postSlug.length);
    var encodedSlug = encodeURIComponent(truncatedSlug);
    var requri = commentServer + '/api/comments/post';
    var payload = {};
    payload.slug = encodedSlug;
    $.ajax(
        {
            url: requri,
            type: 'POST',
            dataType: 'json',
            data: payload,
            success: function (json) {
                var outhtml = '';

                // If there are comments, include a link to the comment form.
                if (json.data.length > 0) {
                    outhtml = '<p class="comment-form-link"><a href="#comment-form">Leave a comment</a></p>'
                }

                // Loop through comments.
                $.each(
                    json.data, function (i) {

                        // Assign JSON data points to variables.
                        var name = json.data[i].name;
                        var created = json.data[i].created_at;
                        var comment = json.data[i].comment;

                        // Create HTML output.
                        outhtml = outhtml + '<div class="comment"><h5>' + name + ' says:</h5>';
                        outhtml = outhtml + '<p class="comment-date">' + created + '</p>';
                        outhtml = outhtml + '<p class="comment-text">' + comment + '</p></div>';
                    });
                $('#post-comments').html(outhtml);
            },
            error: function (e) {
            }
        });

    // Output new comment.
    var form = $('form');
    var submit = $('#submit');

    form.on(
        'submit', function (e) {

            // Prevent default action.
            e.preventDefault();

            // Send ajax request.
            $.ajax(
                {
                    url: commentServer + '/api/comments/new',
                    type: 'POST',
                    dataType: 'json',
                    data: form.serialize(),
                    beforeSend: function () {

                        // Change submit button value text and disable it.
                        // submit.val('Submitting...').attr('disabled', 'disabled');
                        $('.flash-error').remove();
                        $('.flash-success').remove();
                    },
                    success: function (data) {

                        // Check to see if we got an error from the server.
                        if (data.success == false) {
                            var message = '<div class="flash-error">' + data.message + '</div>';
                            $('#post-comments').prepend(message);
                            return;
                        }

                        var name = $(data)[0].data[0].name;
                        var created = $(data)[0].data[0].created_at;
                        var comment = $(data)[0].data[0].comment;

                        // Create HTML output.
                        var thanks = '<div class="flash-success">Thanks for submitting your comment!</div>';
                        $('#post-comments').prepend(thanks);
                        form.trigger('reset');
                        form.hide();

                        // Append new comment.
                        var outhtml = '';
                        outhtml = outhtml + '<div class="comment new"><h5>' + name + ' says:</h5>';
                        outhtml = outhtml + '<p class="comment-date">' + created + '</p>';
                        outhtml = outhtml + '<p class="comment-text">' + comment + '</p></div>';

                        // Append with fadeIn, see http://stackoverflow.com/a/978731
                        var item = $(outhtml).hide().fadeIn(800);
                        $('#post-comments').append(item);
                    },
                    error: function (e) {
                        submit.val('Submit').removeAttr('disabled');
                        $('#post-comments').prepend('<div class="flash-error">' + 'We couldn\'t post your comment, sorry!' + '<br>' + 'Please make sure all fields are filled out or try again later.' + '</div>');
                    }
                });
        });
}
