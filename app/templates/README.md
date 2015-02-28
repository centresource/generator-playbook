# <%= appName %>

[Describe the project.]

## Project Setup
This project utilizes Playbook, reference Playbook's [setup guide](https://github.com/centresource/generator-playbook#get-started).

1. Clone this repository
2. `npm install`
3. `bower install`
4. `bundle install`

## Usage

### Gulp Tasks
##### gulp serve
Serve your source locally into your browser. BrowserSync will automatically load any changes to HTML, CSS and JavaScript that you make.

##### gulp build
Build the concatenated, minified production version of the source into the `dist` directory.<% if (ghPages) { %>

##### gulp deploy
Deploy the production version of the source to [GitHub Pages](http://pages.github.com/) via [gulp-gh-pages](https://www.npmjs.com/package/gulp-gh-pages).<% } %>
