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

// Functions for blog posts.
$(document).ready(
    function () {

        // Expandable comment section.
        $('#js-expander-trigger').click(function () {
            enableCommentForm('#js-expander-trigger');
        });


        $('#comment-count').click(function () {
            enableCommentForm('#comment-count');
        });

        // Give article headings direct links to anchors.
        // Thanks to felicianotech at https://github.com/circleci/circleci-docs.
        $("article h2, article h3, article h4, article h5, article h6").filter("[id]").each(function () {
            $(this).append('<a class="heading-link" href="#' + $(this).attr("id") + '"><i class="fa fa-link"></i></a>');
        });

    });

// COMMENT COUNT.
$(document).ready(
    function () {

        // Create variable for request URI.
        var commentServer = '{{ site.comment_server_url }}';
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

// Export comment functionality and include functionality for comment count button
function enableCommentForm($id) {
    if ($id == '#js-expander-trigger') {
        $('#js-expander-trigger').toggleClass("expander--hidden");
    }
    if ($id == '#comment-count') {
        $('#js-expander-trigger').removeClass("expander--hidden");
    }

    // Create variable for request URI.
    var commentServer = '{{ site.comment_server_url }}';
    var postSlug = window.location.pathname;

    // Remove leading forward slash.
    var truncatedSlug = postSlug.substring(1, postSlug.length);
    var encodedSlug = encodeURIComponent(truncatedSlug);
    var requri = commentServer + '/api/comments/post?slug=' + encodedSlug;
    $.ajax(
        {
            url: requri,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                var outhtml = '';

                // If there are comments, include a link to the comment form.
                if (json.data.length > 0) {
                    outhtml = '<p class="region--comments__link" id="region--comments__link"><a href="#form--comment">Leave a comment</a></p>'
                }

                // Loop through comments.
                $.each(
                    json.data, function (i) {

                        // Assign JSON data points to variables.
                        var name = json.data[i].name;
                        var created = json.data[i].created_at;
                        var comment = json.data[i].comment;
                        var commentClass = 'comment';
                        if (json.data[i].savasian == 1) {
                            commentClass = 'comment savasian';
                        }

                        // Create HTML output.
                        outhtml = outhtml + '<div class="' + commentClass + '">';
                        if (json.data[i].savasian == 1) {
                            outhtml = outhtml + '<img src="/assets/img/logo.svg" class="comment__logo" alt="Savas Labs logo">'
                        }
                        outhtml = outhtml + '<p><span class="c-magenta">' + name + '</span> says:</p>';
                        outhtml = outhtml + '<p class="comment__date">' + created + '</p>';
                        outhtml = outhtml + '<p class="comment__text">' + comment + '</p></div>';
                    });
                $('#region--comments__comments').html(outhtml);
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
                        submit.val('Submitting...').attr('disabled', 'disabled');
                        $('.flash-error').remove();
                        $('.flash-success').remove();
                    },
                    success: function (data) {

                        // Check to see if we got an error from the server.
                        if (data.success == false) {
                            var message = '<div class="flash-error">' + data.message + '</div>';
                            $('#region--comments__comments').prepend(message);
                            return;
                        }

                        var name = $(data)[0].data[0].name;
                        var created = $(data)[0].data[0].created_at;
                        var comment = $(data)[0].data[0].comment;

                        // Create HTML output.
                        var thanks = '<div class="flash-success">Thanks for submitting your comment!</div>';
                        $('#region--comments__comments').append(thanks);
                        $('.flash-success').delay(10000).fadeOut();
                        form.trigger('reset');
                        form.hide();
                        submit.val('Post comment').removeAttr('disabled');

                        // Append new comment.
                        var commentClass = 'comment';
                        if (json.data[i].savasian == 1) {
                          commentClass = 'comment savasian';
                        }

                        // Create HTML output.
                        outhtml = outhtml + '<div class="' + commentClass + '">';
                        if (json.data[i].savasian == 1) {
                          outhtml = outhtml + '<img src="/assets/img/logo.svg" class="comment__logo" alt="Savas Labs logo">'
                        }
                        outhtml = outhtml + '<p><span class="c-magenta">' + name + '</span> says:</p>';
                        outhtml = outhtml + '<p class="comment__date">' + created + '</p>';
                        outhtml = outhtml + '<p class="comment__text">' + comment + '</p></div>';

                        // Append with fadeIn, see http://stackoverflow.com/a/978731
                        var item = $(outhtml).hide().fadeIn(800);
                        $('#region--comments__comments').append(item);

                        // Comment form is hidden but should show if user clicks
                        // the link.
                        $('#region--comments__link').click(function () {
                            form.show();
                        });
                    },
                    error: function (e) {

                        // Re-enable the submit button.
                        submit.val('Post comment').removeAttr('disabled');

                        // Highlight the erroneous field and display the error.
                        var errorField = '#' + e.responseJSON.data.error_field;
                        if (errorField) {
                          $(errorField).addClass('error-field');
                          $(errorField).parent().prepend('<div class="flash-error">' + e.responseJSON.message  + '</div>');

                          // If the user clicks submit again, remove the error highlighting.
                          submit.click(function () {
                            $(errorField).removeClass('error-field');
                          });
                        }
                        else {
                          $('#form--comment').prepend('<div class="flash-error">' + e.responseJSON.message  + '</div>');
                        }
                    }
                });
        });
}
