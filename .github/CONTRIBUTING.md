# Contributing to `vlitejs`

Thanks for being interesting on `vlitejs`! Before submitting your contribution, be sure to take a moment and read the following guide.

- [How to contribute to Open Source](https://opensource.guide/how-to-contribute)
- [Building welcoming communities](https://opensource.guide/building-community)

## Installation

1. Make sure that minimum [Node.js](https://nodejs.org) version is `16.20.0` and npm is installed.
2. After cloning the repository, run `npm install` at the root of the repository.
3. To start the development server, run `npm run start`.

List of npm scripts available:

**Development**

```bash
# Run development server
npm run start

# Run example development server
npm run start:example
```

**Tests**

```bash
# Run ESLint linter
npm run test:eslint

# Run Stylelint linter
npm run test:stylelint

# Run TypeScript types linter
npm run test:types

# Run Markdown linter
npm run test:markdown

# Run all tests (eslint, stylelint, types, markdown)
npm run test
```

**Production**

```bash
# Build the source code for distribution
npm run build

# Run all build and test before publishing
npm run pre:publish
```

## Project structure

- `./config` - Contains configuration files for ESLint, Stylelint, postCSS, Prettier, Babel and Webpack.
- `./src` - Contains the source code. The codebase is written in `ES2015` in TypeScript.
- `./examples` - Contains the examples code.

## Pull requests

You can learn how to work on your first pull request from this series of free video: [How to contribute to an open source project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

To request a new feature or improvement, you can submit an issue with the [feature template](https://github.com/vlitejs/vlite/issues/new?template=feature_request.yml).

Keep the pull requests as small as possible, it's much easier to review. Make sure the PR only does one thing, otherwise please split it.

Make sure the following is done when submitting a pull request:

1. Fork [the repository](https://github.com/vlitejs/vlite) and create your branch from `main`.
2. Make sure to test your changes.
3. Make sure test passes, run `npm run test`.

## Code conventions

- Add comments [JSDoc](https://jsdoc.app) and annotations [TypeScript](https://www.typescriptlang.org) on all functions.
- Use `camelCase` for the names and methods of public variables.

## License

By contributing to `vlitejs`, you agree that your contributions will be licensed under its [MIT license](https://github.com/vlitejs/vlite/blob/main/LICENSE).
