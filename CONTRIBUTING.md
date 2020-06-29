# Contributing Guide

## For Contributors

Thank you for your contribution!

### Setup

```sh
% cd garoon-rest
% npm install
```

### Test

```sh
% cd garoon-rest
% npm test
% npm run lint
```

## For Maintainers

### Merge

After you have approved a PR, please merge the PR using **Squash and merge** with [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format.

### Release

Commenting `@shipjs prepare` on an issue or PR will create a PR for a new release. Merging the PR will trigger publishing to npm, creating a tag, and creating a release.
