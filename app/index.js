'use strict';

var util    = require('util'),
    path    = require('path'),
    chalk   = require('chalk'),
    yeoman  = require('yeoman-generator'),
    globule = require('globule'),
    shelljs = require('shelljs');

var PlaybookGenerator = module.exports = function PlaybookGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  var dependenciesInstalled = ['bundle', 'ruby'].every(function (depend) {
    return shelljs.which(depend);
  });

  // Exit if Ruby dependencies aren't installed
  if (!dependenciesInstalled) {
    console.log('Looks like you\'re missing some dependencies.' +
      '\nMake sure ' + chalk.white('Ruby') + ' and the ' + chalk.white('Bundler gem') + ' are installed, then run again.');
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
    this.jsPre           = props.jsPre === 'None' ? false : props.jsPre.toLowerCase();
    this.sassComp        = props.sassComp.toLowerCase();
    this.googleAnalytics = props.googleAnalytics;

    cb();
  }.bind(this));
};

PlaybookGenerator.prototype.askForDeployment = function askForDeployment() {
  var cb = this.async();
  var prompts = [
    {
      name: 'ghPages',
      message: 'Deploy to GitHub Pages?',
      type: 'confirm',
      default: false
    },
    {
      name: 'ghPagesType',
      type: 'list',
      message: 'Project or User/Organization site?',
      choices: ['Project', 'User/Organization'],
      when: function(answers) {
        return answers.ghPages;
      }
    },
    {
      name: 'ghOwner',
      message: 'GitHub repository owner',
      when: function (answers) {
        return answers.ghPages;
      }
    },
    {
      name: 'ghRepo',
      message: 'GitHub repository name',
      when: function (answers) {
        return answers.ghPages;
      }
    }
  ]

  console.log(chalk.yellow('\nDeployment options.') + ' →');

  this.prompt(prompts, function (props) {
    this.ghPagesType = (props.ghPagesType) ? props.ghPagesType.replace('/', '_').toLowerCase() : null;
    this.ghPages     = props.ghPages;
    this.ghBranch    = (props.ghPagesType === 'project') ? 'gh-pages' : 'master';
    this.ghOwner     = props.ghOwner;
    this.ghRepo      = props.ghRepo;

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
  this.copy('bowerrc', '.bowerrc');
  this.copy('csslintrc', '.csslintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('bower.json', 'bower.json');
  this.template('README.md', 'README.md');
  this.template('package.json', 'package.json');
  this.template('gulpfile.js', 'gulpfile.js');
  this.template('_config.yml', '_config.yml');
  this.template('_config.build.yml', '_config.build.yml');
};

PlaybookGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

PlaybookGenerator.prototype.templates = function templates() {
  this.template('app/_layouts/default.html', 'app/_layouts/default.html');

  if (this.googleAnalytics) {
    this.copy('conditional/template/google-analytics.html', 'app/_includes/shared/google-analytics.html');
  }
};

PlaybookGenerator.prototype.jsPreprocessor = function jsPreprocessor() {
  if (this.jsPre === 'coffeescript') {
    this.copy('conditional/coffee/application.coffee', 'app/scripts/application.coffee');
  } else {
    this.copy('conditional/javascript/application.js', 'app/scripts/application.js');
  }
};

PlaybookGenerator.prototype.installBitters = function installBitters() {
  var root = shelljs.pwd();

  // Install Bitters
  shelljs.cd('app/styles');
  shelljs.exec('bundle exec bitters install');
  shelljs.cd(root);

  // Uncomment Neat grid-settings @import
  var base = shelljs.cat('app/styles/base/_base.scss');
  base = base.replace(/\/\/ @import "grid-settings";/, '@import "grid-settings";');
  base.to('app/styles/base/_base.scss');
};
