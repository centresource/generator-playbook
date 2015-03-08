(function ($) {
  'use strict';

  var CS = {};

  CS.scrollToEl = function (e) {
    e.preventDefault();
    var id = $(e.currentTarget).attr('href');

    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 2000);
  };

  CS.displayRelease = function () {
    var request = $.get('https://api.github.com/repos/centresource/generator-playbook/tags');

    request.success(function (response) {
      $('#release').html(response[0].name);
    });

    request.error(function () {
      var template = '<a href="https://www.npmjs.com/package/generator-playbook">Available on npm</a>';
      $('#version').html(template);
    });
  };

  $(document).ready(function () {
    CS.displayRelease();
    $('#go-to-about').on('click', CS.scrollToEl);
  });
})(jQuery);
