/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('playbook', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('playbook:app', ['../../app']);

      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'app/index.html',
      'app/404.html',
      'app/humans.txt',
      'app/robots.txt',
      '.jshintrc',
      '.gitignore',
      '.editorconfig',
      '.csslintrc',
      '.bowerrc',
      'bower.json',
      'gulpfile.js',
      'package.json'
    ];

    helpers.mockPrompt(this.app, {
      'authorName': 'foo',
      'authorEmail': 'bar',
      'jsPre': 'None',
      'sassComp': 'Ruby',
      'googleAnalytics': false,
      'deploy': false
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });
  });
});
