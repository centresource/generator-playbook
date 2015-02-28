# Contributing to Playbook

### File an Issue
If playbook is exhibiting unexpected behavior, please file an issue that allows the maintainers to reproduce the results you see.
1. Pick a title that describes intent clearly.
2. Please describe the environment-- which versions of OS, Ruby, Node, and Generator-Playbook are you using?
3. Describe in as much detail as possible the steps you took to reach the unexpected behavior.
4. Tell us what the unexpected behavior was, e.g. a stack trace with the error or a screen shot.
5. Expound upon any steps you took to remedy the issue.

You may also use issues to submit feature requests.


### Get Started
1. Clone the repository
2. Make your changes in a topic branch
3. Rebase against `origin/master`, submit a pull request


### Linking Playbook
In order to see and test the changes you've made to Playbook, you'll need to [uninstall](https://www.npmjs.org/doc/cli/npm-uninstall.html) any previously installed versions of Playbook and [link](https://www.npmjs.org/doc/cli/npm-link.html) your local Playbook.

1. `npm uninstall -g generator-playbook`
2. `cd path/to/playbook/repo`
3. `npm link`
4. `cd path/to/desired/location`
5. `yo playbook`

The resulting Playbook generator will be referencing your local copy of the Playbook respository rather than an installed published release.


### Git Commit Messages
- Capitalize your commit messages.
- Start your message with a verb.
- Use present tense.
- Refer to the issue/PR number in your squashed commit message.


### SCSS Style Guide
- Follow the [Centresource FE Guidelines](https://sites.google.com/a/centresource.com/csintranet/Home/development/centresource-fe-dev-guide).
- Two spaces, no tabs.
- Dashes instead of underscores or camel case: `span-columns` **not** `span_columns` or `spanColumns`
- Names should be descriptive and written in full-words: `$visual-grid-color` **not** `$color` or `$vslgrd-clr`
- Space between property and value: `width: 20px` **not** `width:20px`
- Declarations within a block should be ordered alphabetically.
- Blank lines between rules.
- No trailing whitespace. Blank lines should not have any space.


### Tagging and Publishing Releases
1. Update the [package version](https://github.com/centresource/generator-playbook/blob/master/package.json#L3) in `package.json`. This should match the version number that you are publishing to [npmjs.org](https://www.npmjs.org/package/generator-playbook).
2. Commit your version bump: `git commit -am "Version bump."`
3. Create an [annoted git tag](http://git-scm.com/book/en/Git-Basics-Tagging#Annotated-Tags) for the release: `git tag -a v#.#.# -m "Version #.#.#"`
4. Push master/tags: `git push origin master --tags`
5. Publish to npm: `npm publish`

**NOTE**: Playbook is using [semver](http://semver.org/). Do not break this pattern.
