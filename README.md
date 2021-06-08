# Binance connector in Nodejs

[![npm version](https://badge.fury.io/js/binance-connector-node.svg)](https://badge.fury.io/js/binance-connecter-node)
[![Standard-Js](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


Another thin library that working as connector to Binance Public API.

## Installation

```bash
cd <your_project_directory>
npm install binance-connector-node
```

## How to use

```javascript

const { Spot } = require('binance-connector-node')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)
client.account().then(response => client.logger.log(response.data))

client.time().then(response => client.logger.log(response.data))

// todo place order
```

### Testnet

The [spot testnet](https://testnet.binance.vision/) is available. In order to test on testnet:

```javascript

// provide the testnet base url
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision'})
```

More examples are available from `examples` folder

### Integrate with customized logger

The default logger defined in the package is [Node.js Console class](https://nodejs.org/api/console.html). Its output is sent to `process.stdout` and `process.stderr`, same as the global console.

```javascript
const Spot = require('binance-connector-node')
const fs = require('fs')
const { Console } = require('console')

const output = fs.createWriteStream('./logs/stdout.log')
const errorOutput = fs.createWriteStream('./logs/stderr.log')

const logger = new Console({ stdout: output, stderr: errorOutput })
const client = new Spot('', '', {logger: logger})

client.exchangeInfo().then(response => client.logger.log(response.data))
// check the output file

```


## Websocket

```javascript
const { Spot } = require('binance-connector-node')

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

### Integrate with customized logger

The default logger defined in the package is [Node.js Console class](https://nodejs.org/api/console.html). Its output is sent to `process.stdout` and `process.stderr`, same as the global console.

```javascript
const { Console } = require('console')
const fs = require('fs')
const Spot = require('binance-connector-node')

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
cd <this_project_directory>

npm install

npm run test

```

## License
MIT
