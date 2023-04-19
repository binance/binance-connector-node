# Binance connector in Nodejs

[![npm version](https://badge.fury.io/js/%40binance%2Fconnector.svg)](https://badge.fury.io/js/%40binance%2Fconnector)
[![Node version](https://img.shields.io/node/v/%40binance%2Fconnector.svg?style=flat)](http://nodejs.org/download/)
[![Standard-Js](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


This is a lightweight library that works as a connector to [Binance public API](https://github.com/binance/binance-spot-api-docs). It’s designed to be simple, clean, and easy to use with minimal dependencies.


* Source Code: [https://github.com/binance/binance-connector-node](https://github.com/binance/binance-connector-node)
* Official API document:
  * [https://github.com/binance/binance-spot-api-docs](https://github.com/binance/binance-spot-api-docs)
  * [https://binance-docs.github.io/apidocs/spot/en](https://binance-docs.github.io/apidocs/spot/en)
* Support channels:
  * Binance developer forum: [https://dev.binance.vision/](https://dev.binance.vision/)
  * Telegram Channel: [https://t.me/binance_api_english](https://t.me/binance_api_english)
* API key setup: [https://www.binance.com/en-NG/support/faq/360002502072](https://www.binance.com/en-NG/support/faq/360002502072)
* Testnet API key setup: [https://dev.binance.vision/t/99](https://dev.binance.vision/t/99)


## Features

* Supported APIs:
  * `/api/*`
  * `/sapi/*`
  * Spot Websocket Market Stream
  * Spot User Data Stream
* Inclusion of test cases and examples
* Customizable base URL, request timeout and HTTP proxy
* Response metadata can be displayed
* Customizable Logger

## Quick Start

### Installation

```bash
cd <your_project_directory>
npm install @binance/connector
```

## Usage

### RESTful APIs

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
