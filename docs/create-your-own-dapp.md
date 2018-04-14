# Creating Your First nOS dApp

Creating a dApp can be done by building a simple single-page web application.  To get started
quickly, clone or fork the [nOS dApp Starter Kit](https://github.com/nos/dapp-starter-kit), and
follow the documentation there.

Within your dApp, you can integrate with the nOS API.  nOS injects some predefined functions into
your application, allowing you to interact with the NEO blockchain and the currently authenticated
user's account.

## Developing with nOS API

Assuming you run your webapp at `http://localhost:8080`, simply type `localhost:8080` into the nOS
address bar at the top of tha application, then press <kbd>Enter</kbd>.  Refer to the
[API documentation](./api.md) for a complete list of functionality.

In the near future, an `nos-mock` library will be introduced for developing locally without needing
the nOS client to run.
