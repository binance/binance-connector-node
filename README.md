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
- Customizable Logger


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

### Custom Logger Integration

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

The default logger defined in the package is [Node.js Console class](https://nodejs.org/api/console.html). Its output is sent to `process.stdout` and `process.stderr`, same as the global console.

### Error

There are 2 types of error that may be returned from the API server and the user has to handle it properly:

- `Client error`
  - This is thrown when server returns `4XX`, it's an issue from client side.
  - The following properties may be helpful to resolve the issue:
    - Response header - Please refer to `Response Metadata` section for more details.
    - HTTP status code
    - Error code - Server's error code, e.g. `-1102`
    - Error message - Server's error message, e.g. `Unknown order sent.`
    - Request config - Configuration send to the server, which can include URL, request method and headers.
  ```
  // client initialization is skipped
  client.exchangeInfo({ symbol: 'invalidSymbol' })
    .then(response => client.logger.log(response.data))
    .catch(err => {
      client.logger.error(err.response.headers) // full response header
      client.logger.error(err.response.status) // HTTP status code 400
      client.logger.error(err.response.data) // includes both error code and message
      client.logger.error(err.response.config) // includes request's config 
    })

  ```
        
- `Server error`
  - This is thrown when server returns `5XX`, it's an issue from server side.


## Websocket

```javascript
const { Spot } = require('binance-connector')

const client = new Spot('', '', {
  wsURL: 'wss://testnet.binance.vision' // If optional base URL is not provided, wsURL defaults to wss://stream.binance.com:9443
})

const callbacks = {
  open: () => client.logger.log('open'),
  close: () => client.logger.log('closed'),
  message: data => client.logger.log(data)
}
client.aggTradeWS('bnbusdt', callbacks)

// unsubscribe the stream above
setTimeout(() => client.unsubscribe(), 3000)

// support combined stream
client.combinedStreams(['btcusdt@miniTicker', 'ethusdt@tikcer'], callbacks)
```

More websocket examples are available in the `examples` folder

### Unsubscribe a Stream

Unsubscription is achieved by closing the connection. If multiple streams are subscribed with different connections, `unsubscribe()` method closes the first established connection. If this method is called without any connection established, the console will output a message `No connection to close.`

```
// client initialization is skipped
client.aggTradeWS('bnbusdt', callbacks)
client.aggTradeWS('btcusdt', callbacks)

// The first connection (bnbusdt@aggTrade) is closed after 3 secs.
setTimeout(() => client.unsubscribe(), 3000)
// The second connection (btcusdt@aggTrade) is closed after 4 secs.
setTimeout(() => client.unsubscribe(), 4000)

```

### Custom Logger Integration

```javascript
const { Console } = require('console')
const fs = require('fs')
const Spot = require('binance-connector')

const output = fs.createWriteStream('./logs/stdout.log')
const errorOutput = fs.createWriteStream('./logs/stderr.log')

const logger = new Console({ stdout: output, stderr: errorOutput })
const client = new Spot('', '', {logger})

const callbacks = {
  open: () => client.logger.log('open'),
  close: () => client.logger.log('closed'),
  message: data => client.logger.log(data)
}

client.aggTradeWS('bnbusdt', callbacks)
// check the output file

```

The default logger defined in the package is [Node.js Console class](https://nodejs.org/api/console.html). Its output is sent to `process.stdout` and `process.stderr`, same as the global console.

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
