'use strict';

(function () {
  var CS = {};

  CS.scrollToEl = function (e) {
    e.preventDefault();
    var id = $(e.currentTarget).attr('href');

    $('html, body').animate({
      scrollTop: $(id).offset().top
    }, 2000);
  };

  CS.displayRelease = function () {
    var $release = $('#release');
    var request = $.get('https://api.github.com/repos/centresource/generator-playbook/tags');

    request.success(function (data) {
      $release.html(data[0].name);
    });

    request.error(function () {
      var template = 'available on <a href="https://www.github.com/centresource/generator-playbook/tags">Github</a>';
      $release.html(template);
    });
  };

  $(document).ready(function () {
    $('#go-to-about').on('click', CS.scrollToEl);
    CS.displayRelease();
  });
})();
