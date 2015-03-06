# Playbook

[![Circle
CI](https://circleci.com/gh/centresource/generator-playbook.svg?style=svg)](https://circleci.com/gh/centresource/generator-playbook)

Playbook is a Yeoman generator for prototyping and building experiences. [Jekyll](http://jekyllrb.com/) is included for static site generation. [Bourbon](http://bourbon.io), [Neat](http://neat.bourbon.io) & [Bitters](http://bitters.bourbon.io/) are included to help you write CSS faster.

[Gulp](http://gulpjs.com/) is used for compilation of [Sass](http://sass-lang.com) and [CoffeeScript](http://coffeescript.org) (optional). [Bower](http://bower.io/) is used for managing dependencies.

### Prerequisites
If you do not have [Node.js](http://nodejs.org/) `>=0.10`, [Yeoman](http://yeoman.io/) `>=1.1.2`, [Ruby](https://www.ruby-lang.org/en/) `>=2.0` and the [Bundler](http://bundler.io/) gem installed, you must do that first:

- [Node.js](https://nodejs.org)
- [Yeoman](http://yeoman.io/learning/index.html)
- [Ruby](https://rvm.io/rvm/install)
- [Bundler](http://bundler.io/#getting-started)

### Installation
````bash
npm install -g generator-playbook
````

### Updates
If you already have Playbook installed, please update before
generating new projects to get the latest updates.

```bash
npm list -g generator-playbook # See your installed version
npm info generator-playbook dist-tags.latest # See the latest version
npm update -g generator-playbook # Update Playbook globally
```

### Usage
Playbook will run `bundle install`. If you would like to install the Playbook gems into a gemset, set that up before running `yo playbook`.

````bash
mkdir project-name && cd project-name
yo playbook
````

*Should you run into an error such as `command yo not found` it may be related to a path issue when installing Node.js via Homebrew. Please refer to the top answer on this [StackOverflow question](http://stackoverflow.com/questions/15846076/command-not-found-after-installation).*

### Gulp Tasks
##### gulp serve
Serve your source locally into your browser. BrowserSync automatically loads any changes to HTML, CSS and JavaScript that you make.

##### gulp build
Build the concatenated, minified production version of your source into the `dist` directory.

##### gulp deploy
Deploy the production build of your source to [GitHub Pages](http://pages.github.com/).

If you choose to deploy a GitHub User/Organization Page, your source must be tracked in a branch other than `master`. User/Organization Pages serve the `master` branch to users visiting your Page. For more information, please see the [GitHub Pages Help](https://help.github.com/articles/user-organization-and-project-pages#project-pages).
