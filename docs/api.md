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
  * [`getPublicKey`](#getpublickey)
  * [`encrypt`](#encrypt)
  * [`decrypt`](#decrypt)
* [Full implementation example](#full-implementation-example)
* [Future](#future)
  * [Block height](#block-height)
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
regularly. All API functions will have a maximum of ONE argument: a JSON object containing all the necessary info.**

The nOS client provides a prebuilt API that is still growing.  For any dApp running through the
client, the API can be accessed via `window.NOS.V1`.  All functions return a
[`Promise`](https://www.google.com/search?q=js+promise&oq=js+promise&aqs=chrome..69i57j69i60l3.731j0j7&sourceid=chrome&ie=UTF-8), which can be used to determine if the call succeeded or failed.  Some calls will fail if the
user rejects the action.

### `getAddress`
The `getAddress` function provides the address of the currently authenticated account.  It does not
require the user to grant permission.

#### Parameters
None.

#### Returns
**string** - The address of the currently signed in user.

#### Example
```javascript
const nos = window.NOS.V1;

nos.getAddress()
  .then((address) => alert(`Address: ${address}`))
  .catch((err) => alert(`Error: ${err.message}`));
```

### `getBalance`
The `getBalance` function provides the balance of a certain address for a
specified asset or NEP5 token.  It does not require the user to grant permission.

#### Parameters
* `config` **object** - The config options to perform this operation.
* `config.asset` **string** - The asset ID or NEP5 token script hash.
* `config.address` **string** (Optional) - The address of the user you'd like to receive the balance for. This defaults to the currently logged on user if the parameter is not passed.

#### Returns
**string** - The balance of the requested asset owned by a certain address.  A string is returned instead of a number to prevent floating point rounding issues.

#### Example
```javascript
const nos = window.NOS.V1;

const NEO = 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b';
const address = 'AZPkgTJixxkSFPyBZrcVpLj9nsHsPDUVkF';

// Example without the optional parameter
nos.getBalance({ asset: NEO })
  .then((balance) => alert(`Balance: ${balance}`))
  .catch((err) => alert(`Error: ${err.message}`));

// Example with the optional parameter
nos.getBalance({ asset: NEO, address })
  .then((balance) => alert(`Balance: ${balance}`))
  .catch((err) => alert(`Error: ${err.message}`));  
```

### `claimGas`
The `claimGas` function claims any unclaimed GAS on behalf of the currently authenticated account.
It requires the user to grant permission.

#### Parameters
None.

#### Returns
**string** - The claim transaction ID.

#### Example
```javascript
const nos = window.NOS.V1;

nos.claimGas()
    .then((txid) => alert(`GAS claim txid: ${txid}`))
    .catch((err) => alert(`Error: ${err.message}`));
```

### `testInvoke`
The `testInvoke` function executes a test invocation transaction on behalf of the currently
authenticated account.  It does not require the user to grant permission.

#### Parameters
* `config` **object** - The config options to perform this operation.
* `config.scriptHash` **string** - The script hash of the Smart Contract you want to invoke.
* `config.operation` **string** - The operation of the Smart Contract you want to invoke.
* `config.args` **string[]** - An arguments array of the Smart Contract you want to invoke.
* `config.encodeArgs` **boolean** (Optional) - A flag detailing whether or not you want the nOS API to handle encoding or `args`. This is `true` by default.
**NOTE: If you're sending no arguments, this should be an empty array.**

#### Returns
**object** - Returns the RPC result, including testInvoke script, consumed GAS and the result stack.

#### Example
```javascript
const nos = window.NOS.V1;

const scriptHash = '2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc';
const operation = '9937f74e-1edc-40ae-96ad-1120166eab1b';
const args = ['ef68bcda-2892-491a-a7e6-9c4cb1a11732'];

// If you handle encoding yourself, use:
// nos.testInvoke({ scriptHash, operation, args, encodeArgs: false })
nos.testInvoke({ scriptHash, operation, args })
    .then((script) => alert(`Test invoke script: ${script} `))
    .catch((err) => alert(`Error: ${err.message}`));
```

### `invoke`
The `invoke` function executes an invocation transaction on behalf of the currently authenticated
account.  It requires the user to grant permission.

#### Parameters
* `config` **object** - The config options to perform this operation.
* `config.scriptHash` **string** - The script hash of the Smart Contract you want to invoke.
* `config.operation` **string** - The operation of the Smart Contract you want to invoke.
* `config.args` **string[]** - An arguments array of the Smart Contract you want to invoke.
* `config.encodeArgs` **boolean** (Optional) - A flag detailing whether or not you want the nOS API to handle encoding or `args`. This is `true` by default.

#### Returns
**string** - The invocation transaction ID.

#### Example
```javascript
const nos = window.NOS.V1;

const scriptHash = '2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc';
const operation = '9937f74e-1edc-40ae-96ad-1120166eab1b';
const args = ['ef68bcda-2892-491a-a7e6-9c4cb1a11732'];

// If you handle encoding yourself, use:
// nos.invoke({ scriptHash, operation, args, encodeArgs: false })
nos.invoke({ scriptHash, operation, args })
    .then((txid) => alert(`Invoke txid: ${txid} `))
    .catch((err) => alert(`Error: ${err.message}`));
```

### `getStorage`
The `getStorage` function retrieves the value for a specified key from a specified smart contract.
It does not require the user to grant permission.

#### Parameters
* `config` **object** - The config options to perform this operation.
* `config.scriptHash` **string** - The script hash of a deployed Smart Contract.
* `config.key` **string** - The key to retrieve from the Smart Contract.
* `config.encodeInput` **boolean** (Optional) - A flag detailing whether or not to encode the input. This is `true` by default
* `config.decodeOutput` **boolean** (Optional) - A flag detailing whether or not to decode the output. This is `true` by default

#### Returns
**any** - The stored value or `null` if the key did not contain a value.

#### Example
```javascript
const nos = window.NOS.V1;

const scriptHash = '85e9cc1f18fcebf9eb8211a128807e38d094542a';
const key = 'post.latest';

// If you want to handle encoding / decoding yourself, use:
// nos.getStorage({ scriptHash, key, encodeInput: false, decodeOutput: false })
nos.getStorage({ scriptHash, key })
    .then((data) => alert(`Get storage data: ${data} `))
    .catch((err) => alert(`Error: ${err.message}`));
```

### `send`
The `send` function creates a contract transaction to send assets (NEO or GAS) to a specified
address on behalf of the currently authenticated account.  It requires the user to grant permission.

#### Parameters
* `config` **object** - The config options to perform this operation.
* `config.asset` **string** - The asset ID script hash.
* `config.amount` **string** - The amount of the asset to send. **NOTE: It is recommended that strings are used instead of numbers to prevent floating point rounding issues.**
* `config.receiver` **string** - The recipient address of the asset.

#### Returns
**string** - The contract transaction ID.

#### Example
```javascript
const nos = window.NOS.V1;

const GAS = '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7';
const amount = '1';
const receiver = 'AMh8o3uv5PwdryBsiZPd5zoVBDVaredZLG';

nos.send({ asset: GAS, amount, receiver })
    .then((txid) => alert(`${amount} GAS sent in transaction ${txid}`))
    .catch((err) => alert(`Error: ${err.message}`));
```

### `getPublicKey`
The `getPublicKey` provides the public key of the currently authenticated account. It does not require the user to grant permission.

#### Parameters
None.

#### Returns
**string** - The public key of the currently signed in user.

#### Example
```javascript
const nos = window.NOS.V1;

nos.getPublicKey()
  .then((publicKey) => alert(`Public Key: ${publicKey}`))
  .catch((err) => alert(`Error: ${err.message}`));
```

### `encrypt`
The `encrypt` function allows you to encrypt arbitrary data for another user (you will need his public key, please see `getPublicKey`). It does not require the user to grant permission.

#### Parameters
* `config` **object** - The config options to perform this operation.
* `config.publicKey` **string** - The public key of the recipient account.
* `config.data` **string | Buffer** - The data to encrypt.

#### Returns
**object** - object containing encrypted data and values needed for decryption (`iv`, `mac`, `data`)

#### Example
```javascript
const nos = window.NOS.V1;

// for the test data below WIF of the sender account is KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr
const recipientPublicKey = '031a6c6fbbdf02ca351745fa86b9ba5a9452d785ac4f7fc2b7548ca2a46c4fcf4a';
const data = 'some text';

nos.encrypt({ recipientPublicKey, data })
  .then(({ iv, mac, data }) => alert(`iv: ${iv}\nmac: ${mac}\ndata: ${data}`))
  .catch((err) => alert(`Error: ${err.message}`));
```

### `decrypt`
The `decrypt` function allows you to decrypt previously encrypted data for this user (you will need public key of the sender account, please see `getPublicKey`). It does not require the user to grant permission.

#### Parameters
* `config` **object** - The config options to perform this operation.
* `config.publicKey` **string** - The public key of the sender account.
* `config.iv` **string** - The IV received during encryption.
* `config.mac` **string** - The MAC received during encryption.
* `config.data` **string** | **Buffer** - The data to decrypt.

#### Returns
**Buffer** - decrypted data

#### Example
```javascript
const nos = window.NOS.V1;

// for the test data below WIF of the recipient account is KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr
const senderPublicKey = '031a6c6fbbdf02ca351745fa86b9ba5a9452d785ac4f7fc2b7548ca2a46c4fcf4a';
const iv = 'cd26ef7a70b1b3fcf54ef32394008db6';
const mac = '170d03c25d49c7c03c8e1515a316f94fafb52feac73c46196525813883d64596';
const data = '16f55cabb8b9c87a85af3232f30c0a07';

nos.decrypt({ senderPublicKey, iv, mac, data })
  .then((data) => alert(`Decrypted Data: ${data}`))
  .catch((err) => alert(`Error: ${err.message}`));
```

## Full implementation example
This is an example of a service layer in your frontend application which implements all
functionalities of nOS.

```javascript
const nos = window.NOS.V1;

const NEO = 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b';
const GAS = '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7';
const RPX = 'ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9';

const scriptHash = '2f228c37687d474d0a65d7d82d4ebf8a24a3fcbc';
const operation = '9937f74e-1edc-40ae-96ad-1120166eab1b';
const args = ['ef68bcda-2892-491a-a7e6-9c4cb1a11732'];

nos.getAddress()
  .then((address) => alert(`Address: ${address}`))
  .catch((err) => alert(`Error: ${err.message}`));

nos.getBalance({ asset: NEO })
  .then((balance) => alert(`Balance: ${balance}`))
  .catch((err) => alert(`Error: ${err.message}`));

nos.getBalance({ asset: NEO, address: 'AZPkgTJixxkSFPyBZrcVpLj9nsHsPDUVkF' })
  .then((balance) => alert(`Balance: ${balance}`))
  .catch((err) => alert(`Error: ${err.message}`));

nos.invoke({ scriptHash, operation, args })
  .then((txid) => alert(`Invoke txid: ${txid} `))
  .catch((err) => alert(`Error: ${err.message}`));

nos.testInvoke({ scriptHash, operation, args })
  .then((script) => alert(`Test invoke script: ${script} `))
  .catch((err) => alert(`Error: ${err.message}`));

const scriptHash = '85e9cc1f18fcebf9eb8211a128807e38d094542a';
const key = 'post.latest';
nos.getStorage({ scriptHash, key })
  .then((data) => alert(`Get storage data: ${data} `))
  .catch((err) => alert(`Error: ${err.message}`));

const asset = GAS;
const amount = '1';
const receiver = 'AMh8o3uv5PwdryBsiZPd5zoVBDVaredZLG';
nos.send({ asset, amount, receiver })
  .then((txId) => alert(`${amount} ${asset} sent: ${txId} `))
  .catch((err) => alert(`Error: ${err.message}`));

nos.claimGas()
  .then((txId) => alert(`Gas claimed ${txId}`))
  .catch((err) => alert(`Error: ${err.message}`));

nos.getPublicKey()
  .then((publicKey) => alert(`Public Key: ${publicKey}`))
  .catch((err) => alert(`Error: ${err.message}`));

// for the test data below WIF of the sender account is KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr
const recipientPublicKey = '031a6c6fbbdf02ca351745fa86b9ba5a9452d785ac4f7fc2b7548ca2a46c4fcf4a';
const data = 'some text';
nos.encrypt({ recipientPublicKey, data })
  .then(({ iv, mac, data }) => alert(`iv: ${iv}\nmac: ${mac}\ndata: ${data}`))
  .catch((err) => alert(`Error: ${err.message}`));

// for the test data below WIF of the recipient account is KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr
const senderPublicKey = '031a6c6fbbdf02ca351745fa86b9ba5a9452d785ac4f7fc2b7548ca2a46c4fcf4a';
const iv = 'cd26ef7a70b1b3fcf54ef32394008db6';
const mac = '170d03c25d49c7c03c8e1515a316f94fafb52feac73c46196525813883d64596';
const data = '16f55cabb8b9c87a85af3232f30c0a07';
nos.decrypt({ senderPublicKey, iv, mac, data })
  .then((data) => alert(`Decrypted Data: ${data}`))
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
