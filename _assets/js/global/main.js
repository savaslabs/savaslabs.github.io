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
                    $('#comments-trigger').html('Comments (' + json.data[0][truncatedSlug] + ')');
                }
            });
    });
