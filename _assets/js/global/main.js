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

