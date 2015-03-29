# Contributing to Playbook

### Submitting Issues
If Playbook is exhibiting unexpected behavior, please file an issue that allows the maintainers to reproduce the results you see. You may also use issues to submit feature requests.

1. Pick a title that describes intent clearly
2. Describe in as much detail as possible the steps you took to reach the unexpected behavior
3. Describe the unexpected behavior (e.g. – a stack trace with the error or a screen shot)
4. Describe the expected behavior
5. Please describe your environment (e.g. – versions of OS, Ruby, Node and Playbook you are using)


### Development Flow
1. Clone the repository
2. Make your changes in a topic branch
3. Rebase against `origin/master`
4. Submit a pull request


### Linking Playbook
In order to see and test the changes you've made to Playbook, you'll need to [uninstall](https://www.npmjs.org/doc/cli/npm-uninstall.html) any previously installed versions of Playbook and [link](https://www.npmjs.org/doc/cli/npm-link.html) your local Playbook.

1. `npm uninstall -g generator-playbook`
2. `cd path/to/playbook/repo`
3. `npm link`
4. `cd path/to/desired/location`
5. `yo playbook`

The resulting Playbook generator will be referencing your local copy of the Playbook repository rather than an installed published release.


### Git Commit Messages
- Capitalize your commit messages
- Start your message with a verb
- Use present tense
- [Refer to the issue/PR number](https://help.github.com/articles/closing-issues-via-commit-messages/) in your squashed commit message


### Tagging and Publishing Releases
1. Update the [package version](https://github.com/centresource/generator-playbook/blob/master/package.json#L3) in `package.json`. This should match the version number that you intend to publish to [npmjs.org](https://www.npmjs.org/package/generator-playbook).
2. Commit your version bump: `git commit -am "Prepare #.#.# release"`
3. Create an [annoted git tag](http://git-scm.com/book/en/Git-Basics-Tagging#Annotated-Tags) for the release: `git tag -a v#.#.# -m "Version #.#.#"`
4. Push master/tags: `git push origin master --tags`
5. Publish to npm: `npm publish`

**NOTE**: Playbook is using [semver](http://semver.org/). Do not break this pattern.
