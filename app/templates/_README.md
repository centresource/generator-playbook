# <%= appName %>

[Describe the project.]

## Project Setup
This project utilizes Playbook, reference Playbook's [setup guide](https://github.com/centresource/generator-playbook#get-started).

1. Clone this repository
2. `npm install`
3. `bower install`
4. `bundle install`

## Usage

### Grunt Tasks
##### grunt serve
Serve your source locally into your browser. LiveReload will automatically load any changes to HTML, CSS and JavaScript that you make.

##### grunt check
Check the quality of your source with tools like [JSLint](http://www.jslint.com/), [CSSLint](http://csslint.net/) and [csscss](http://zmoazeni.github.io/csscss/).

##### grunt test
Run any test that you have defined for your source.

##### grunt build
Build the concatenated, minified production version of the source into the `dist` directory.<% if (deploy) { %>

##### grunt deploy
Deploy the production version of the source to <% if (deployHost === 'GitHub Pages') { %>[GitHub Pages](http://pages.github.com/)<% } %><% if (deployHost === 'Generic Git Remote') { %>the server<% } %> via [grunt-build-control](https://github.com/robwierzbowski/grunt-build-control).<% } %>
