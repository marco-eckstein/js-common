[![npm version](https://badge.fury.io/js/%40marco-eckstein%2Fjs-utils.svg)](
    https://badge.fury.io/js/%40marco-eckstein%2Fjs-utils
)
[![npm downloads](https://img.shields.io/npm/dt/@marco-eckstein/js-utils.svg)](
    https://npm-stat.com/charts.html?package=%40marco-eckstein%2Fjs-utils&from=2018-05-02
)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](
    https://conventionalcommits.org
)

# js-utils

JavaScript utilities implemented in Typescript

## Development

No global modules other than `npm` are necessary.

- Run `npm install` once after checking out.
- Then, run either `npm test` for a single full build cycle (clean, compile, lint, test),
  or `npm start` for running the full cycle initially and then watch for file changes which will
  trigger appropriate parts of the build cycle (compile, lint, test). The watch mode is not bulletproof:
  It works for file updates, but you may get problems if you rename or delete files.
- Run `npm run standard-version` instead of `npm version` to bump the version.
- Before publishing, make sure the copyright year range is up to date.
- Publish with `npm publish --access public`. This will run the full build cycle before publishing.
