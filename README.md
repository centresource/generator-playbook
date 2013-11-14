# Playbook

A boilerplate template with base styles and stylesheet structure to allow for quick front end project spin up. This template is setup to utilize [Sass](http://sass-lang.com), [CoffeeScript](http://coffeescript.org), [Bourbon](http://bourbon.io) & [Neat](http://neat.bourbon.io).

## Get Started
### Prerequisites
If you do not have [Node.js](http://nodejs.org/), [Ruby](https://www.ruby-lang.org/en/) and [Bundler](http://bundler.io/) installed, you must do that first:

- [Install Node & npm.](http://madebyhoundstooth.com/blog/install-node-with-homebrew-on-os-x/)
- [Install Ruby with rvm.](https://rvm.io/rvm/install)
- [Install Bundler.](http://bundler.io/)

### Install Playbook
If you have already installed Playbook skip to [usage](https://github.com/centresource/generator-almanac#usage). First clone the repository using the clone URL found on this page, then:

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

### View the Site Locally
````bash
grunt server
````

### Build for Production
````bash
grunt build
````
