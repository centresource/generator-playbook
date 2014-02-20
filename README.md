# Playbook

Playbook is a Yeoman generator to get you building interfaces faster. [Jekyll](http://jekyllrb.com/) is included for static site generation. [Bourbon](http://bourbon.io), [Neat](http://neat.bourbon.io) & [Bitters](http://bitters.bourbon.io/) are included to help you write CSS faster.

[Grunt](http://gruntjs.com/) is used for compilation of [Sass](http://sass-lang.com) and [CoffeeScript](http://coffeescript.org) (optional). [Bower](http://bower.io/) is used for managing dependencies.

### Prerequisites
If you do not have [Node.js](http://nodejs.org/) `>=0.10`, [Yeoman](http://yeoman.io/) `>=1.1.2`, [Ruby](https://www.ruby-lang.org/en/) `>=1.9` and the [Bundler](http://bundler.io/) gem installed, you must do that first:

- [Node.js](http://davidcalhoun.me/2013/12/16/developer-tools-homebrew/)
- [Yeoman](http://yeoman.io/gettingstarted.html)
- [Ruby](https://rvm.io/rvm/install)
- [Bundler](http://bundler.io/#getting-started)

### Installation
````bash
npm install -g generator-playbook
````

### Usage
Playbook will run `bundle install`, so if you would like to install the Playbook gems into a gemset, set that up before running `yo playbook`.

````bash
mkdir project-name && cd project-name
yo playbook
````

*Should you run into an error such as `command yo not found` it may be related to a path issue when installing Node.js via Homebrew. Please refer to the top answer on this [StackOverflow question](http://stackoverflow.com/questions/15846076/command-not-found-after-installation).*

### Grunt Tasks
##### grunt serve
Serve your source locally into your browser. LiveReload will automatically load any changes to HTML, CSS and JavaScript that you make.

##### grunt check
Check the quality of your source with tools like [JSLint](http://www.jslint.com/), [CSSLint](http://csslint.net/) and [csscss](http://zmoazeni.github.io/csscss/).

##### grunt test
Run any test that you have defined for your source.

##### grunt build
Build the concatenated, minified production version of the source into the `dist` directory.

##### grunt deploy
Deploy the production version of the source to [GitHub Pages](http://pages.github.com/) or [Heroku](https://www.heroku.com/) via [grunt-build-control](https://github.com/robwierzbowski/grunt-build-control). This ability is configurable during Playbook generation.
