# Binance connector in Nodejs

[![npm version](https://badge.fury.io/js/binance-connector.svg)](https://badge.fury.io/js/binance-connecter)
[![Node version](https://img.shields.io/node/v/binance-connector.svg?style=flat)](http://nodejs.org/download/)
[![Standard-Js](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


This is a lightweight library that works as a connector to [Binance public API](https://github.com/binance/binance-spot-api-docs). It’s designed to be simple, clean, and easy to use with minimal dependencies.

- Supported APIs:
    - `/api/*`
    - `/sapi/*`
    - Spot Websocket Market Stream
    - Spot User Data Stream
- Inclusion of test cases and examples
- Customizable base URL, request timeout and HTTP proxy
- Response metadata can be displayed


## Installation

```bash
npm install binance-connector
```

## RESTful APIs

```javascript
const { Spot } = require('binance-connector')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

// Get account information
client.account().then(response => client.logger.log(response.data))

// Place a new order
client.newOrder('BNBUSDT', 'BUY', 'LIMIT', {
  price: '350',
  quantity: 1,
  timeInForce: 'GTC'
}).then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))

```

Please find `examples` folder to check for more endpoints.

### Testnet

While `/sapi/*` endpoints don't have testnet environment yet, `/api/*` endpoints can be tested in 
[Spot Testnet](https://testnet.binance.vision/). You can use it by changing the base URL:

```javascript
// provide the testnet base url
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision'})
```

### Base URL

If `base_url` is not provided, it defaults to `api.binance.com`.

It's recommended to pass in the `base_url` parameter, even in production as Binance provides alternative URLs in case of performance issues:

- `https://api1.binance.com`
- `https://api2.binance.com`
- `https://api3.binance.com`

### Optional Parameters

Optional parameters are encapsulated to a single object as the last function parameter.

```javascript
const { Spot } = require('binance-connector')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.account({ recvWindow: 2000 }).then(response => client.logger.log(response.data))

```

### Response Metadata

The Binance API server provides weight usages in the headers of each response. This information can be fetched from `headers` property. `x-mbx-used-weight` and `x-mbx-used-weight-1m` show the total weight consumed within 1 minute.

```
// client initialization is skipped

client.exchangeInfo().then(response => client.logger.log(response.headers['x-mbx-used-weight-1m']))

```

### Integrate with Customized Logger

The default logger defined in the package is [Node.js Console class](https://nodejs.org/api/console.html). Its output is sent to `process.stdout` and `process.stderr`, same as the global console.

```javascript
const Spot = require('binance-connector')
const fs = require('fs')
const { Console } = require('console')

const output = fs.createWriteStream('./logs/stdout.log')
const errorOutput = fs.createWriteStream('./logs/stderr.log')

const logger = new Console({ stdout: output, stderr: errorOutput })
const client = new Spot('', '', {logger: logger})

client.exchangeInfo().then(response => client.logger.log(response.data))
// check the output file

```

### Error

There are 2 types of error may be returned from the API server and the user has to handle it properly:

- `Client error`
  - This is thrown when server returns `4XX`, this means either query parameters or API key is not in an acceptable form.
  - The following properties may be helpful to resolve the issue:
    - Response header - Please refer to `Response Metadata` section for more details.
    - HTTP status code
    - Error code - Server's error code, e.g. `-1102`
    - Error message - Server's error message, e.g. `Unknown order sent.`
        
  ```
  // client initialization is skipped
  client.exchangeInfo({ symbol: 'invalidSymbol' })
    .then(response => client.logger.log(response.data))
    .catch(err => {
      client.logger.error(err.response.headers) // full response header
      client.logger.error(err.response.status) // 400
      client.logger.error(err.response.data) // includes both error code and message
    })

  ```
        
- `Server error`
  - This is thrown when server returns `5XX`, it's an issue from server side.


## Websocket

```javascript
const { Spot } = require('binance-connector')

const client = new Spot('', '', {
  wsURL: 'wss://testnet.binance.vision' // optional, for testnet only. By default on production
})

const callbacks = {
  open: () => client.logger.log('open'),
  close: () => client.logger.log('closed'),
  message: data => client.logger.log(data)
}
client.aggTradeWS('bnbusdt', callbacks)


// support combined stream, e.g.
client.combinedStreams(['btcusdt@miniTicker', 'ethusdt@tikcer'], callbacks)
```

More websocket examples are available in the `examples` folder

### Integrate with Customized Logger

The default logger defined in the package is [Node.js Console class](https://nodejs.org/api/console.html). Its output is sent to `process.stdout` and `process.stderr`, same as the global console.

```javascript
const { Console } = require('console')
const fs = require('fs')
const Spot = require('binance-connector')

const output = fs.createWriteStream('./logs/stdout.log')
const errorOutput = fs.createWriteStream('./logs/stderr.log')
const logger = new Console({
  stdout: output,
  stderr: errorOutput,
})

const client = new Spot('', '', {
  logger
})

const callbacks = {
  open: () => client.logger.log('open'),
  close: () => client.logger.log('closed'),
  message: data => client.logger.log(data)
}

client.aggTradeWS('bnbusdt', callbacks)
// check the output file

```


## Test

```bash

npm install

npm run test

```

## Limitation

Futures and Vanilla Options APIs are not supported:

  - `/fapi/*`
  - `/dapi/*`
  - `/vapi/*`
  -  Associated Websocket Market and User Data Streams
