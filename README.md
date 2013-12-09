# Playbook

A boilerplate template with base styles and stylesheet structure to allow for quick front end project spin up. The static site is built and served using [Jekyll](http://jekyllrb.com/). [Grunt](http://gruntjs.com/) is used to compile [Sass](http://sass-lang.com) and [CoffeeScript](http://coffeescript.org). [Bower](http://bower.io/) is used for dependencies. Playbook includes [Bourbon](http://bourbon.io) and [Neat](http://neat.bourbon.io).

## Get Started
### Prerequisites
If you do not have [Node.js](http://nodejs.org/), [Ruby](https://www.ruby-lang.org/en/) and [Bundler](http://bundler.io/) installed, you must do that first:

- [Install Node & npm.](http://madebyhoundstooth.com/blog/install-node-with-homebrew-on-os-x/)
- [Install Ruby with rvm.](https://rvm.io/rvm/install)
- [Install Bundler.](http://bundler.io/)
- [Install Yeoman](http://yeoman.io/)

### Install Playbook
Clone the repository using the clone URL found on this page, then:

````bash
cd path/to/generator-playbook
npm link
````

## Usage
### Create a Site
````bash
cd path/to/desired/location/
mkdir projectname && cd projectname
rvm use 2.0.0@generator-playbook --create --ruby-version
yo playbook
````

Should you run into an error such as `command yo not found` it is most
likely a path issue cause by a Homebrew install of Node. Please refer
to the top answer on this [stack overflow question](http://stackoverflow.com/questions/15846076/command-not-found-after-installation).

### View the Site Locally
````bash
grunt server
````

### Check, Test & Build for Production
````bash
grunt
````
