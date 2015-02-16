'use strict';
var util = require('util');
var path = require('path');
var chalk = require('chalk');
var yeoman = require('yeoman-generator');
var globule = require('globule');
var shelljs = require('shelljs');


var PlaybookGenerator = module.exports = function PlaybookGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  var dependenciesInstalled = ['bundle', 'ruby'].every(function (depend) {
    return shelljs.which(depend);
  });

  var isRubyTwoSpecified = function rubyTwoInstalled() {
    var rubyVersion = shelljs.exec('ruby --version', { silent: true }).output;
    return !/^ruby 2/.test(rubyVersion)
  };

  // Exit if Ruby < 2.x dependencies aren't installed
  if (!dependenciesInstalled || !isRubyTwoSpecified) {
    console.log('Looks like you\'re missing some dependencies.' +
      '\nMake sure ' + chalk.white('Ruby (>= 2.0.0)') + ' and the ' + chalk.white('Bundler gem') + ' are installed, then run again.');
    shelljs.exit(1);
  }

  this.gitInfo = {
    name: this.user.git.username,
    email: this.user.git.email
  }

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.appName = path.basename(process.cwd());
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PlaybookGenerator, yeoman.generators.Base);

PlaybookGenerator.prototype.askForUser = function askForUser() {
  var cb = this.async();
  var prompts = [
    {
      name: 'authorName',
      message: 'What is your name?',
      default: this.gitInfo.name
    },
    {
      name: 'authorEmail',
      message: 'What is your email?',
      default: this.gitInfo.email
    }
  ];

  console.log(this.yeoman);
  console.log(chalk.yellow('\nTell us a little about the project.') + ' →');

  this.prompt(prompts, function (props) {

    this.authorName  = props.authorName;
    this.authorEmail = props.authorEmail;

    cb();
  }.bind(this));
};

PlaybookGenerator.prototype.askForTools = function askForTools() {
  var cb = this.async();
  var prompts = [
    {
      name: 'jsPre',
      type: 'list',
      message: 'JavaScript preproccesor',
      choices: ['None', 'CoffeeScript']
    },
    {
      name: 'sassComp',
      type: 'list',
      message: 'Sass compiler',
      choices: ['Ruby', 'LibSass']
    },
    {
      name: 'googleAnalytics',
      type: 'confirm',
      message: 'Include Google Analytics?',
      default: false
    }
  ]

  console.log(chalk.yellow('\nPreprocessors and tools.') + ' →');

  this.prompt(prompts, function (props) {
    this.googleAnalytics = props.googleAnalytics;

    // Multiple choice 'None' to false
    this.jsPre = props.jsPre === 'None' ? false : props.jsPre.toLowerCase();

    // Lowercase sassComp variable
    this.sassComp = props.sassComp.toLowerCase();

    cb();
  }.bind(this));
};

PlaybookGenerator.prototype.askForDeployment = function askForDeployment() {
  var cb = this.async();
  var prompts = [
    {
      name: 'deploy',
      message: 'Use grunt-build-control for deployment?',
      type: 'confirm',
      default: false
    },
    {
      name: 'deployHost',
      type: 'list',
      message: 'Host to deploy to',
      choices: ['GitHub Pages', 'Generic remote'],
      when: function (answers) {
        return answers.deploy;
      }
    },
    {
      name: 'ghOwner',
      message: 'GitHub repository owner',
      when: function (answers) {
        return answers.deployHost === 'GitHub Pages';
      }
    },
    {
      name: 'ghRepo',
      message: 'GitHub repository name',
      when: function (answers) {
        return answers.deployHost === 'GitHub Pages';
      }
    },
    {
      name: 'ghPagesProject',
      type: 'list',
      message: 'GitHub Project or User/Organization site?',
      choices: ['Project', 'User/Organization'],
      when: function(answers) {
        return answers.deployHost == 'GitHub Pages';
      }
    },
    {
      name: 'remoteURL',
      message: 'Remote URL',
      when: function (answers) {
        return answers.deployHost === 'Generic remote';
      }
    },
    {
      name: 'deployBranch',
      message: 'Branch to deploy to',
      default: function(answers) {
        if (answers.ghPagesProject === 'Project') {
          return 'gh-pages';
        } else if (answers.ghPagesProject === 'User/Organization') {
          return 'master';
        } else {
          return 'dist';
        }
      },
      when: function (answers) {
        return answers.deploy;
      }
    }
  ]

  console.log(chalk.yellow('\nDeployment options.') + ' →');

  this.prompt(prompts, function (props) {

    this.deploy         = props.deploy;
    this.deployHost     = props.deployHost;
    this.ghOwner        = props.ghOwner;
    this.ghRepo         = props.ghRepo;
    this.deployBranch   = props.deployBranch;

    if (props.ghPagesProject) {
      this.ghPagesProject = props.ghPagesProject.replace('/', '_').toLowerCase();
    }

    if (this.deployHost === 'GitHub Pages') {
      this.deployRemote = 'git@github.com:' + this.ghOwner + '/' + this.ghRepo + '.git';
    } else {
      this.deployRemote = props.remoteURL;
    }

    cb();
  }.bind(this));
};

PlaybookGenerator.prototype.rubyDependencies = function rubyDependencies() {
  this.template('Gemfile');
  this.conflicter.resolve(function (err) {
    if (err) {
      return this.emit('error', err);
    }
    shelljs.exec('bundle install');
  });
};

PlaybookGenerator.prototype.app = function app() {
  this.directory('app', 'app');
  this.copy('Gemfile', 'Gemfile');
  this.copy('bowerrc', '.bowerrc');
  this.copy('csslintrc', '.csslintrc');
  this.copy('gitignore', '.gitignore');
  this.template('_Gruntfile.js', 'Gruntfile.js');
  this.template('config.yml', '_config.yml');
  this.template('_config.build.yml', '_config.build.yml');
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_README.md', 'README.md');
};

PlaybookGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

PlaybookGenerator.prototype.templates = function templates() {
  this.template('conditional/template/default.html', 'app/_layouts/default.html');
  this.template('conditional/template/index.html', 'app/index.html');

  if (this.googleAnalytics) {
    this.copy('conditional/template/google-analytics.html', 'app/_includes/shared/google-analytics.html');
  };
};

PlaybookGenerator.prototype.jsPreprocessor = function jsPreprocessor() {
  if (this.jsPre === 'coffeescript') {
    this.copy('conditional/coffee/app.coffee', 'app/scripts/app.coffee');
  } else {
    this.copy('conditional/javascript/app.js', 'app/scripts/app.js');
  }
};

PlaybookGenerator.prototype.installBitters = function installBitters() {
  var root = shelljs.pwd();

  // Install Bitters
  shelljs.cd('app/styles');
  shelljs.exec('bundle exec bitters install');
  shelljs.cd(root);

  // Replace Rails-style @import of neat-helpers
  var gridSettings = shelljs.cat('app/styles/base/_grid-settings.scss');
  gridSettings = gridSettings.replace(/^@import 'neat-helpers';.*/, "@import 'neat/app/assets/stylesheets/neat-helpers';");
  gridSettings.to('app/styles/base/_grid-settings.scss');

  // Uncomment Neat grid-settings @import
  var base = shelljs.cat('app/styles/base/_base.scss');
  base = base.replace(/^\/\/ @import 'grid-settings';.*/, "@import 'grid-settings';");
  base.to('app/styles/base/_base.scss');
};
