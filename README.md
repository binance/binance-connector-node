# Binance connector in Nodejs

[![npm version](https://badge.fury.io/js/%40binance%2Fconnector.svg)](https://badge.fury.io/js/%40binance%2Fconnector)
[![Node version](https://img.shields.io/node/v/%40binance%2Fconnector.svg?style=flat)](http://nodejs.org/download/)
[![Standard-Js](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


This is a lightweight library that works as a connector to [Binance public API](https://github.com/binance/binance-spot-api-docs). It’s designed to be simple, clean, and easy to use with minimal dependencies.

- Supported APIs:
    - `/api/*`
    - `/sapi/*`
    - Spot Websocket Market Stream
    - Spot User Data Stream
    - Spot Websocket API
- Inclusion of test cases and examples
- Customizable base URL
- Support request timeout and HTTP proxy (since v2)
- Response metadata can be displayed
- Customizable Logger


## Installation

```bash
npm install @binance/connector
```

## Documentation

[https://binance.github.io/binance-connector-node/](https://binance.github.io/binance-connector-node/)

## RESTful APIs

```javascript
const { Spot } = require('@binance/connector')

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

## Key Pair Based Authentication

```javascript
const { Spot, PrivateKeyAlgo } = require('@binance/connector')

const apiKey = ''
const apiSecret = '' // has no effect when RSA private key is provided

// load private key
const privateKey = fs.readFileSync('/Users/john/ssl/private_key_encrypted.pem')
const privateKeyPassphrase = 'password'
const privateKeyAlgo = PrivateKeyAlgo.RSA // for RSA key
const privateKeyAlgo = PrivateKeyAlgo.ED25519 // for Ed25519 key

const client = new Spot(apiKey, apiSecret, {
  privateKey,
  privateKeyPassphrase, // only used for encrypted key
  privateKeyAlgo
})

// Get account information
client.account().then(response => client.logger.log(response.data))
```

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
const { Spot } = require('@binance/connector')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.account({ recvWindow: 2000 }).then(response => client.logger.log(response.data))

```

### Timeout

It's easy to set timeout in milliseconds in request. If the request take longer than timeout, the request will be aborted. If it's not set, there will be no timeout.

```javascript
const { Spot } = require('@binance/connector')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret, { timeout: 1000 })

client.account()
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error.message))
```

### Proxy

The `axios` package is used as the http client in this library. A proxy settings is passed into `axios` directly, the details can be found at [here](https://github.com/axios/axios#request-config):

```javascript
const { Spot } = require('@binance/connector')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret,
  {
    proxy: {
      protocol: 'https',
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: 'proxy_user',
        password: 'password'
      }
    }
  }
)
```

You may have a HTTP proxy, that can bring the problem that you need to make a HTTPS connection through the HTTP proxy.  You can do that by build a HTTPS-over-HTTP tunnel by npm package [tunnel](https://www.npmjs.com/package/tunnel), and then pass the turnnel agent to `httpsAgent` in `axios`.

```javascript
const tunnel = require('tunnel')

const agent = tunnel.httpsOverHttp({
  proxy: {
    host: "127.0.0.1",
    port: 3128
  }
})

const client = new Spot(null, null,
  {
    baseURL: "https://api.binance.com",
    httpsAgent: agent
  }
)

client.time()
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))

```
[This comment](https://github.com/axios/axios/issues/925#issuecomment-359982190) provides more details.

### Response Metadata

The Binance API server provides weight usages in the headers of each response. This information can be fetched from `headers` property. `x-mbx-used-weight` and `x-mbx-used-weight-1m` show the total weight consumed within 1 minute.

```
// client initialization is skipped

client.exchangeInfo().then(response => client.logger.log(response.headers['x-mbx-used-weight-1m']))

```

### Custom Logger Integration

```javascript
const Spot = require('@binance/connector')
const fs = require('fs')
const { Console } = require('console')

// make sure the logs/ folder is created beforehand
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

### Websocket Stream
```javascript
const { WebsocketStream } = require('@binance/connector')
const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

// define callbacks for different events
const callbacks = {
  open: () => logger.debug('Connected with Websocket server'),
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketStreamClient = new WebsocketStream({ logger, callbacks })
// subscribe ticker stream
websocketStreamClient.ticker('bnbusdt')
// close websocket stream
setTimeout(() => websocketStreamClient.disconnect(), 6000)

```

### Unsubscribe Websocket Stream

```javascript
// unsubscribe websocket stream
websocketStreamClient.unsubscribe('bnbusdt@kline_1m')
```

### WebSocket API

```javascript
const { WebsocketAPI } = require('@binance/connector')
const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

// callbacks for different events
const callbacks = {
  open: (client) => {
    logger.debug('Connected with Websocket server')
    // send message to get orderbook info after connection open
    client.orderbook('BTCUSDT')
    client.orderbook('BNBUSDT', { limit: 10 })
  },
  close: () => logger.debug('Disconnected with Websocket server'),
  message: data => logger.info(data)
}

const websocketAPIClient = new WebsocketAPI(null, null, { logger, callbacks })

// disconnect the connection
setTimeout(() => websocketAPIClient.disconnect(), 20000)

```

More websocket examples are available in the `examples` folder


### Auto Reconnect

If there is a close event not initiated by the user, the reconnection mechanism will be triggered in 5 secs.

### Ping Server

It is possible to ping server from client, and expect to receive a PONG message.

```javascript
websocketStreamClient.pingServer()
```

### Custom Logger Integration

The default logger defined in the package is [Node.js Console class](https://nodejs.org/api/console.html). Its output is sent to `process.stdout` and `process.stderr`, same as the global console.

Note that when the connection is initialized, the console outputs a list of callbacks in the form of `listen to event: <event_name>`.

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

## License
MIT
