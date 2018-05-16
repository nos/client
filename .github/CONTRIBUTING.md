# Contributing

Welcome to the nOS community! We're always looking for more contributors and are happy to have you.

Therefor a big thank you for being here! We really appreciate you taking the time for reading our guidelines!

# How to contribute
## Reporting Bugs
Well-written bug reports with consistently reproducible steps are invaluable to the development of nOS. Bugs are tracked as GitHub issues. Before creating an issue, please perform a search to see if the problem has already been reported. After you've determined a bug does not already exist, create an issue and fill in the template.

## Suggesting Enhancements
Feature requests are welcome. But take a moment to find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to convince the project's developers of the merits of this feature. Please provide as much detail and context as possible.


## Code Contribution
### Before getting started

- Chat with us on [Discord](https://discord.nos.io/) about ways to contribute!
- Documentation (like the text you are reading now) can always use improvement!
- Adding test coverage is a great way to get familiar with the codebase.
- Find an existing issue with the help wanted and good first issue labels.

### Open an issue

  Do open an issue so that everyone knows what is happening. This reduces the chance of double work and allows everyone, new or old, to join in the discussion and development.

### Scope your work

  Scope your work such that it can be described within 1 commit message. This is important as we will be squashing your commits when merging and thus, you will only have one commit message to work with.

### Work on a branch based of `develop`
* `master` and `develop` are protected and require a PR with approved reviews for changes
* Use Conventional Commits' types for branches and camelCase the topic: `feat/ui`, `chore/login`, `chore/refactorHomePage`

During development:
- Ensure code is formatted through `yarn lint` (or `npm run lint`).
- Ensure tests pass through `yarn test` (or `npm run test`).

There is no need to squash your work as we will do that when the maintainer merges the PR.

### Submit your PR

- Follow the process outlined in [GitHub Standard Fork & Pull Request Workflow](https://gist.github.com/Chaser324/ce0505fbed06b947d962) when submitting a pull request.
- Fill in the pull request template.
- Title your PR with a conventional commit message as such:
  ```
  type(scope):desc
  ```
  **Type** can be `chore`, `feat`, or `docs`.

  **Scope** is the package folder that you are focusing on, `api`, `hocs`, `account`, etc.

  Describe your changes within a short sentence. If there are breaking changes, Do start with `BREAKING CHANGE`.

### And you are done!
Once you've had your first pull request approved and merged, find existing issues marked with `help wanted` labels to continue contributing or suggest an enhancement. Respond on the issue thread expressing interest in working on it. This helps other people know that the issue is active, and hopefully prevents duplicated efforts.


## License
By contributing to nOS, you agree that your contributions will be licensed under its MIT license.
