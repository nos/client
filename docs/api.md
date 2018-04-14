# nOS API Documentation

* [Getting started](#getting-started)
* [API](#api)
  * [`getAddress`](#getaddress)
  * [`getBalance`](#getbalance)
  * [`claimGas`](#claimgas)
  * [`testInvoke`](#testinvoke)
  * [`invoke`](#invoke)
  * [`getStorage`](#getstorage)
  * [`send`](#send)
* [Full implementation example](#full-implementation-example)
* [Future](#future)
  * [Events](#events)
  * [`nos:` protocol](#nos-protocol)

## Getting started
nOS provides a mechanism for registering a dapp at a `.neo` "domain" (e.g.: `nos.neo`), which can
then be viewed through the nOS client.  By registering a domain with the nOS Smart Contract, you can
build a simple web app that can interact with a set of simple API functions exposed by the nOS
client.  These API functions provide a simple mechanism for performing actions on behalf of the
account if the user chooses to provide access.

## API
**NOTE: The API is in active development and may change frequently.  Be sure to check back
regularly.**

The nOS client provides a prebuilt API that is still growing.  For any dApp running through the
client, the API can be accessed via `window.NOS.V1`.  All functions return a
[`Promise`](https://www.google.com/search?q=js+promise&oq=js+promise&aqs=chrome..69i57j69i60l3.731j0j7&sourceid=chrome&ie=UTF-8), which can be used to determine if the call succeeded or failed.  Some calls will fail if the
user rejects the action.

## `getAddress`
The `getAddress` function provides the address of the currently authenticated account.  It does not
require the user to grant permission.

### Parameters
None.

### Returns
`string` - The address of the currently signed in user.

### Example
```javascript
const nos = window.NOS.V1;

nos.getAddress()
  .then((address) => alert(`Address: ${address}`))
  .catch((err) => alert(`Error: ${err.message}`));
```

## `getBalance`
The `getBalance` function provides the balance of the currently authenticated account for a
specified asset or NEP5 token.  It does not require the user to grant permission.

### Parameters
1. `string` - The asset ID or NEP5 token script hash.

### Returns
`string` - The balance of the requested asset owned by the currently authenticated account.  A
string is returned instead of a number to prevent floating point rounding issues.

### Example
```javascript
const nos = window.NOS.V1;

const NEO = 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b';

nos.getBalance(NEO)
  .then((balance) => alert(`Balance: ${balance}`))
  .catch((err) => alert(`Error: ${err.message}`));
```

## `claimGas`
The `claimGas` function claims any unclaimed GAS on behalf of the currently authenticated account.
It requires the user to grant permission.

### Parameters
None.

### Returns
`string` - The claim transaction ID.

### Example
```javascript
const nos = window.NOS.V1;

nos.claimGas()
    .then((txid) => alert(`GAS claim txid: ${txid}`))
    .catch((err) => alert(`Error: ${err.message}`));
```

## `testInvoke`
The `testInvoke` function executes a test invocation transaction on behalf of the currently
authenticated account.  It does not require the user to grant permission.

### Parameters
1. `string` - The script hash of the Smart Contract you want to invoke.
2. `string` - The operation of the Smart Contract you want to invoke.
3. `...any` - Zero or more args of the Smart Contract you want to invoke.

### Returns
`string` - Returns the script for the test invoke.

### Example
```javascript
const nos = window.NOS.V1;

const scriptHash = '2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc';
const operation = '9937f74e-1edc-40ae-96ad-1120166eab1b';
const arg1 = 'ef68bcda-2892-491a-a7e6-9c4cb1a11732';
// const arg2 = '...' if you want to add more args, just append it to the function

nos.testInvoke(scriptHash, operation, arg1)
    .then((script) => alert(`Test invoke script: ${script} `))
    .catch((err) => alert(`Error: ${err.message}`));
```

## `invoke`
The `invoke` function executes an invocation transaction on behalf of the currently authenticated
account.  It requires the user to grant permission.

### Parameters
1. `string` - The script hash of the Smart Contract you want to invoke.
2. `string` - The operation of the Smart Contract you want to invoke.
3. `string` - Zero or more args of the Smart Contract you want to invoke.

### Returns
`string` - The invocation transaction ID.

### Example
```javascript
const nos = window.NOS.V1;

const scriptHash = '2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc';
const operation = '9937f74e-1edc-40ae-96ad-1120166eab1b';
const arg1 = 'ef68bcda-2892-491a-a7e6-9c4cb1a11732';
// const arg2 = '...' if you want to add more args, just append it to the function

nos.invoke(scriptHash, operation, arg1)
    .then((txid) => alert(`Invoke txid: ${txid} `))
    .catch((err) => alert(`Error: ${err.message}`));
```

## `getStorage`
The `getStorage` function retrieves the value for a specified key from a specified smart contract.
It does not require the user to grant permission.

### Parameters
1. `string` - The script hash of a deployed Smart Contract.
1. `string` - The key to retrieve from the Smart Contract.

### Returns
`any` - The stored value or `null` if the key did not contain a value.

### Example
```javascript
const nos = window.NOS.V1;

const scriptHash = '85e9cc1f18fcebf9eb8211a128807e38d094542a';
const key = 'post.latest';

nos.getStorage(scriptHash, key)
    .then((data) => alert(`Get storage data: ${data} `))
    .catch((err) => alert(`Error: ${err.message}`));
```

## `send`
The `send` function creates a contract transaction to send assets (NEO or GAS) to a specified
address on behalf of the currently authenticated account.  It requires the user to grant permission.

### Parameters
1. `string` - The asset ID script hash.
1. `string` - The amount of the asset to send.  It is recommended that strings are used instead of
   numbers to prevent floating point rounding issues.
1. `string` - The recipient address of the asset.

### Returns
`string` - The contract transaction ID.

### Example
```javascript
const nos = window.NOS.V1;

const GAS = '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7';
const amount = '1';
const receiver = 'AMh8o3uv5PwdryBsiZPd5zoVBDVaredZLG';

nos.send(GAS, amount, receiver)
    .then((txid) => alert(`${amount} GAS sent in transaction ${txid}`))
    .catch((err) => alert(`Error: ${err.message}`));
```

# Full implementation example
This is an example of a service layer in your frontend application which implements all
functionalities of nOS.

```javascript
const nos = window.NOS.V1;

const NEO = 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b';
const GAS = '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7';
const RPX = 'ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9';

const scriptHash = '2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc';
const operation = '9937f74e-1edc-40ae-96ad-1120166eab1b';
const arg1 = 'ef68bcda-2892-491a-a7e6-9c4cb1a11732';

nos.getAddress()
  .then((address) => alert(`Address: ${address}`))
  .catch((err) => alert(`Error: ${err.message}`));

nos.getBalance(scriptHash)
  .then((balance) => alert(`Balance: ${balance}`))
  .catch((err) => alert(`Error: ${err.message}`));

nos.invoke(scriptHash, operation, arg1)
  .then((txid) => alert(`Invoke txid: ${txid} `))
  .catch((err) => alert(`Error: ${err.message}`));

nos.testInvoke(scriptHash, operation, arg1)
  .then((script) => alert(`Test invoke script: ${script} `))
  .catch((err) => alert(`Error: ${err.message}`));

const scriptHash = '85e9cc1f18fcebf9eb8211a128807e38d094542a';
const key = 'post.latest';
nos.getStorage(scriptHash, key)
  .then((data) => alert(`Get storage data: ${data} `))
  .catch((err) => alert(`Error: ${err.message}`));

const asset = GAS;
const amount = '1';
const receiver = 'AMh8o3uv5PwdryBsiZPd5zoVBDVaredZLG';
nos.send(asset, amount, receiver)
  .then((data) => alert(`${amount} ${asset} sent: ${data} `))
  .catch((err) => alert(`Error: ${err.message}`));

nos.claimGas()
  .then((data) => alert(`Gas claimed ${data}`))
  .catch((err) => alert(`Error: ${err.message}`));
```

## Future
More features are coming to the nOS API in the near future.  The nOS team plans to work closely with
dApp developers to ensure that any interactions that will ease development are exposed through the
API.

### Block height

The nOS API will expose a function for fetching the current block height.

### Events

To prevent constant polling for NEO blockchain data, some event-based functionality will be added to
the nOS client, which dApps can subscribe to.  For example, when a new block is added to the chain,
or a new transaction for the current account is created, your dApp should be notified.  More details
forthcoming.

### `nos:` protocol

If your dApp links to a target with an `nos:` protocol, the nOS client will treat it as a dApp
request.  This can open another dApp, or it can open another page related to the current dApp.
More details forthcoming.
