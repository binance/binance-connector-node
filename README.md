# Binance connector in Nodejs

Another thin library that working as connector to Binance Public API.

## Installation

```javascript

npm install binance-conector-node
```

## How to use

```javascript

const { Spot } = require('binance-connector-node')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)
client.account().then(response => console.log(response.data))

client.time().then(response => console.log(response.data))

# todo place order
```

### Testnet

The [spot testnet](https://testnet.binance.vision/) is available. In order to test on testnet:

```javascript

// provide the testnet base url
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision'})
```

More examples are available from `examples` folder

## Websocket

```javascript
const bunyan = require('bunyan')
const { Spot } = require('binance-connector-node')
const logger = bunyan.createLogger({
  name: 'binance connector',
  stream: process.stdout,
  level: 'debug' // set to debug to display info for development/testing
})

const client = new Spot('', '', {
  logger // logger is optional,
  wsURL: 'wss://testnet.binance.vision' // optional, for testnet only. By default on production
})

const callbacks = {
  open: () => console.log('open'),
  close: () => console.log('closed'),
  message: function (data) {
    console.log(data)
  }
}
client.aggTradeWS('bnbusdt', callbacks)


// support combined stream, e.g.
client.combinedStreams(['btcusdt@miniTicker', 'ethusdt@tikcer'], callbacks)
```

## Test

```javascript

npm install

npm run test

```

## License
MIT
