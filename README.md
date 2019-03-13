<p align="center">
  <img src="./.github/screenshot.png" width="400px" />
</p>

<h1 align="center">nOS</h1>
<p align="center">
  <a href="https://github.com/nos/client/releases">
    <img src="https://img.shields.io/github/release/nos/client/all.svg" />
  </a>
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
  </a>
  <a href="https://discordapp.com/invite/eGFAskm">
    <img src="https://img.shields.io/badge/chat-discord-brightgreen.svg" />
  </a>
  <a href="https://circleci.com/gh/nos/client/tree/develop">
    <img src="https://img.shields.io/circleci/project/github/nos/client/develop.svg" />
  </a>
  <a href="https://renovatebot.com/">
    <img src="https://img.shields.io/badge/renovate-enabled-brightgreen.svg" />
  </a>
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" />
  </a>
  <a href="https://codecov.io/gh/nos/client">
    <img src="https://codecov.io/gh/nos/client/branch/develop/graph/badge.svg" />
  </a>
</p>
<p align="center">
  <strong>nOS</strong> is a blockchain powered virtual operating system that serves as the gateway to Decentralized Applications.
</p>
<p align="center">
  The <strong>nOS Client</strong> (Developer MVP Release) allows for the development of Decentralized Applications that interact with Smart Contracts in the back-end.
</p>

---

# Getting Started with nOS

The standalone client installers can be found [here](https://github.com/nos/client/releases). To build manually, the client can be cloned from GitHub and run using the development steps below.

### Commands

```bash
# Cloning from Github
git clone https://github.com/nos/client.git

# Install dependencies and launch the nOS client
# This is used to start developing on the nOS client
yarn install && yarn start

# Testing command
yarn test

# Testing with debug (repl) command
yarn test:debug

# Distribution command (code signing certificates are required to make this work)
yarn dist
```

# Contribute to this repository

We welcome contributions to the code base. If you are interested in becoming a contributor, please read the [contributing guide](/.github/CONTRIBUTING.md) that covers the following:

- [Reporting bugs](/.github/CONTRIBUTING.md#reporting-bugs)
- [Suggesting enhancements](/.github/CONTRIBUTING.md#Suggesting-Enhancements)
- [Code contribution guidelines](/.github/CONTRIBUTING.md#Code-Contribution)

There is a [specific channel called develop](https://discord.gg/CXZb3BS) on Discord to discuss development.

# Contribute by building a dApp on nOS

Need some help with building nOS dApps? Check out our dedicated [documentation website](https://docs.nos.io/) containing useful info for the following topics:

- [**nOS Client API Documentation**](https://docs.nos.io/docs/nos-client/api.html)
- [Create nOS dApp Usage](https://docs.nos.io/docs/create-nos-dapp/installation-usage.html)
- [nOS Local Setup and usage](https://docs.nos.io/docs/nos-local/installation-usage.html)

**Check out the documentation of the [Create nOS dApp CLI tool](https://docs.nos.io/docs/create-nos-dapp/installation-usage.html) to get going quickly.**

Resources:

- [Create nOS dApp repository](https://github.com/nos/create-nos-dapp)
- [Create nOS dApp example (NeoBlog implementation)](https://github.com/nos/dapp-neoblog)

# Releasing

## Windows & Linux

We use [CircleCI](https://circleci.com/gh/nos/client) to automatically create builds based upon git tags.

1. Create a tag, e.g. `v1.0.0`.
   1. `git tag -a v1.0.0 -m "release"` - the `v`-prefix is required for auto updates to work
   2. `git push origin v1.0.0`
2. Wait for `deploy_win64` and `deploy_linux` jobs to upload the artifacts to Github Release page as a draft.

## macOS

1. Export the following variables:
   1. `CSC_LINK` - This is the path to the .p12 certificate file
   2. `CSC_KEY_PASSWORD` - This is the password of the .p12 certificate file
   3. `CSC_IDENTITY_AUTO_DISCOVERY` - Set to `false` to disable usage of local keychain (By default it looks in your `login` keychain)
2. Create the distributable, i.e. `yarn dist`.
3. Locate and upload the following files as these are required for the auto-updater to work:
   1. `dist/nOS-1.0.0-mac.zip`
   2. `dist/nOS-1.0.0-mac.dmg`
   3. `dist/nOS-1.0.0-mac.dmg.blockmap`
   4. `dist/latest-mac.yml`
   
##### Generating hashes for the artifacts
- MacOS: `shasum -a 256 ./*` - Where the final argument is the location of the artifacts
