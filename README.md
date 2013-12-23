# Playbook

A boilerplate template with base styles and stylesheet structure to allow for quick front end project spin up. The static site is built and served using [Jekyll](http://jekyllrb.com/). [Grunt](http://gruntjs.com/) is used to compile [Sass](http://sass-lang.com) and [CoffeeScript](http://coffeescript.org). [Bower](http://bower.io/) is used for dependencies. Playbook includes [Bourbon](http://bourbon.io), [Neat](http://neat.bourbon.io) and [Bitters](http://bitters.bourbon.io/).

## Get Started
### Prerequisites
If you do not have [Node.js](http://nodejs.org/) `>=0.10`, [Ruby](https://www.ruby-lang.org/en/) `>=1.9` and the [Bundler](http://bundler.io/) gem installed, you must do that first:

- [Node.js](http://davidcalhoun.me/2013/12/16/developer-tools-homebrew/)
- [Ruby](https://rvm.io/rvm/install)
- [Bundler](http://bundler.io/)
- [Yeoman](http://yeoman.io/)

### Install Playbook
Clone this repository using the clone URL found on this page. Then:

````bash
cd path/to/generator-playbook
npm link
````

## Usage
### Create a Site
````bash
cd path/to/desired/location/
mkdir projectname && cd projectname
yo playbook
````

*Should you run into an error such as `command yo not found` it may be related to a path issue when installing Node.js via Homebrew. Please refer to the top answer on this [StackOverflow question](http://stackoverflow.com/questions/15846076/command-not-found-after-installation).*

### Grunt Tasks
- Check, test & build for production: `grunt`
- Serve the site locally: `grunt server`
- Deploy to production: `grunt deploy`
- Check source: `grunt check`
- Run tests: `grunt test`
- Build for production: `grunt build`

### Deployment
During the generation of your Playbook, you have the option of including [grunt-build-control](https://github.com/robwierzbowski/grunt-build-control). You can use this tool to deploy to [GitHub Pages](http://pages.github.com/) or [Heroku](http://heroku.com). You can deploy with the follow Grunt task:

````bash
grunt deploy
````
