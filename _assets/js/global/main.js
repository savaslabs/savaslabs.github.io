// Mobile menu.
$(document).ready(
  function () {
    'use strict';
    const $menuToggle = $('#js-mobile-menu').unbind();
    const $menu = $('#js-navigation-menu');
    $menu.removeClass("show");

    $menuToggle.on(
      'click', function (e) {
        e.preventDefault();
        $menu.slideToggle(
          function () {
            if ($menu.is(':hidden')) {
              $menu.removeAttr('style');
            }
          });
      });
  });

// Smooth scrolling.
// See https://css-tricks.com/snippets/jquery/smooth-scrolling/
$(document).ready(
  function () {
    'use strict';
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

// Give article headings direct links to anchors.
// Thanks to felicianotech at https://github.com/circleci/circleci-docs.
$(document).ready(
  function () {
    'use strict';
    $("article h2, article h3, article h4, article h5, article h6").filter("[id]").each(function () {
      $(this).append('<a class="heading-link" href="#' + $(this).attr("id") + '"><i class="fa fa-link"></i></a>');
    });
  });

