# Creating Your First nOS dApp

### Pre-requisites:

First of all you'll need nOS browser locally. This is required to open your dApp.
You can follow the instructions here:

```
// Clone the nOS repo
$ git clone https://github.com/nos/client.git nos-client

// Navigate to the cloned repository
$ cd nos-client

// Install dependencies and launch the nOS client
// This is used to start developing on the nOS client
$ yarn install && yarn start

// or if you want to create a temporary binary

// Distribution command
// After running `yarn dist` you can navigate to `dist` directory and execute the `nOS` binary in a terminal.
$ yarn install && yarn dist

// Now add nos api-functions to it

$ npm i --save @nosplatform/api-functions
$ yarn add @nosplatform/api-functions
```

Creating a dApp can be done by building a simple single-page web application.  To get started
quickly, clone or fork the [nOS dApp Starter Kit](https://github.com/nos/dapp-starter-kit), and
follow the documentation there.

Within your dApp, you can integrate with the nOS API.  nOS injects some predefined functions into
your application, allowing you to interact with the NEO blockchain and the currently authenticated
user's account.

## Developing with nOS API

Assuming you run your webapp at `http://localhost:8080`, simply type `localhost:8080` into the nOS
address bar (which you built/compiled in the pre-requisites step earlier) at the top of that application, then press <kbd>Enter</kbd>.  Refer to the
[API documentation](./api.md) for a complete list of functionality.

In the near future, an `nos-mock` library will be introduced for developing locally without needing
the nOS client to run.
