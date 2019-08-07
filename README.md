[<img src="./images/prysma.png" height="180">](https://github.com/Rooknj/prysma)

# Prysma-UI

[![Build Status](https://travis-ci.org/Rooknj/prysma-ui.svg?branch=master)](https://travis-ci.org/Rooknj/prysma-ui)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

User Interface for Prysma

## Installing

Prysma-UI is bundled with Prysma and is served statically using express.

Currently new releases of Prysma-UI are manually added to Prysma.

## Developing

### Built With

- [React](https://github.com/facebook/react)
- [Apollo](https://www.apollographql.com/docs/react/)
- [React-Router](https://reacttraining.com/react-router/)
- [Styled-Components](https://www.styled-components.com/)
- [Material-UI](https://material-ui.com/)

### Prerequisites

- Nodejs v8.10 or greater is required as this project uses [Create React App](https://facebook.github.io/create-react-app/docs/getting-started#creating-an-app) (Check by running `node -v`)
- Yarn (Check by running `yarn -v`)

### Setting up Dev

```
git clone https://github.com/Rooknj/prysma-ui.git
cd prysma-ui
yarn install
```

### Run Prysma-UI locally

Using API specified through environment configuration (defaults to http://prysma.local:80)

Default Config Environment Variables

- PROXY_PROTOCOL=http
- PROXY_HOST=prysma.local
- PROXY_PORT=80

```
yarn start
```

Using API located at http://localhost:4001 (the default location for a locally running instance of prysma)

```
yarn start --local
```

### Syncing GraphQL Schema

We use [GraphQL Code Generator](https://graphql-code-generator.com/) to keep the client and server beautifully in sync

To sync, make sure you have a Prysma server running at http://localhost:4001/graphql then run `yarn codegen`

Configuration is located at [codegen.yml](/codegen.yml)

### Testing

Tests are written using [Jest](https://jestjs.io/)

Run tests on watch mode:

```
yarn test
```

Run tests with coverage:

```
yarn test --coverage
```

Run tests once:

```
yarn test --no-watch
```

### Building

Create Production Bundle (outputs to /build)

```
yarn build
```

### Deploying

Deployments happen automatically using Semantic-Release based off of semantic commit messages

## Commit Messages

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org)

Example Messages
- chore(docs): updated Readme
- refactor: renamed LedStrip to Light
- fix(LightMessenger): fixed a bug where an incorrect message format was being used
- feat: Added ability to assign lights to different rooms
- BREAKING CHANGE: Swapped database from Redis to Sqlite3

CI will fail if you do not use the correct commit format. Local messages are linted using [Commitlint](https://commitlint.js.org/#/)

Commitizen support coming soon

## Versioning

We use [SemVer 2.0.0](https://semver.org/) for versioning. To see available versions, check out the [releases page](https://github.com/Rooknj/prysma-ui/releases)

## Style Guide

### Linting

Linting is managed by [ESLint](https://eslint.org/)

Run `yarn lint` to check all files

Currently we are extending eslint:recommended, @typescript-eslint/recommended, airbnb, eslint-comments/recommended, and jest/recommended

Full config is located in [.eslintrc.js](/.eslintrc.js)

Note: The linter is ran during CI and the build will fail if there are any errors. Currently we are not automatically fixing linting errors so you will have to make sure the linter passes manually

### Code Style

Code style is managed by [Prettier](https://prettier.io/) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

All default prettier styles are enabled except for the overrides located in [.prettierrc.js](/.prettierrc.js)

Prettier is automatically ran on staged files every commit using [Husky](https://github.com/typicode/husky) and [Lint-Staged](https://github.com/okonet/lint-staged)

You can run prettier manually on every file through the command `yarn reformat` or you can set up prettier to run inside your IDE/Editor

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
