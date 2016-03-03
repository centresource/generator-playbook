'use strict';

(function () {
  
  var nav;

  nav = function () {

    // Sliding Mobile Navigation
    $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart',function (e) {
      $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
      e.preventDefault();
    });

    // ScrollTo effect
    $("#component-selector a").on('click touchstart', function (e) {
      var target = $(this).attr('href');
      $('html, body').animate({
          scrollTop: $(target).offset().top
      }, 600);
      e.preventDefault();
    });

  };

  Styleguide.Nav = function () {
    nav();
  };
  
}(this));