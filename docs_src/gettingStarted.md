# Getting Started

## Installation

```bash
cd <your_project_directory>
npm install @binance/connector
```

## API Key Pair Generation

One account can have multiple API key and secret key pairs.
Please follow the [step by step tutorial](https://www.binance.com/en-NG/support/faq/360002502072) and create the key on web site or mobile app.

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

Please find `examples` folder to check for more endpoints.

### Base URL

If `base_url` is not provided, it defaults to `api.binance.com`.

It's recommended to pass in the `base_url` parameter, even in production as Binance provides alternative URLs in case of performance issues:

- `https://api1.binance.com`
- `https://api2.binance.com`
- `https://api3.binance.com`

### Optional Parameters

Optional parameters are encapsulated to a single object as the last function parameter. For example, `recvWindow` is available for endpoints requiring timestamp and signature. It defaults to `5000` (milliseconds) and can be any value lower than `60000` (milliseconds).
Anything beyond the limit will result in an error response from Binance server.

```javascript
const { Spot } = require('@binance/connector')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.account({ recvWindow: 6000 }).then(response => client.logger.log(response.data))

```

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
const { Spot } = require('@binance/connector')

const client = new Spot('', '', {
  wsURL: 'wss://testnet.binance.vision' // If optional base URL is not provided, wsURL defaults to wss://stream.binance.com:9443
})

const callbacks = {
  open: () => client.logger.log('open'),
  close: () => client.logger.log('closed'),
  message: data => client.logger.log(data)
}
const aggTrade = client.aggTradeWS('bnbusdt', callbacks)

// unsubscribe the stream above
setTimeout(() => client.unsubscribe(aggTrade), 3000)

// support combined stream
const combinedStreams = client.combinedStreams(['btcusdt@miniTicker', 'ethusdt@tikcer'], callbacks)
```

More websocket examples are available in the `examples` folder.

### Unsubscribe a Stream

Unsubscription is achieved by closing the connection. If this method is called without any connection established, the console will output a message `No connection to close.`

```
// client initialization is skipped
const wsRef = client.aggTradeWS('bnbusdt', callbacks)

// The connection (bnbusdt@aggTrade) is closed after 3 secs.
setTimeout(() => client.unsubscribe(wsRef), 3000)

```

### Subscribe a User Data Stream
User data streams provide the account, balance, and order updates related to a user. In order to collect such data, a listen key is required. There are 3 different kind of listen keys provided: spot, cross margin, and isolated margin. Each key refers to one specific data stream. Besides, once a listen key is generated by a POST request, e.g. `POST /api/v3/userDataStream` for spot user data stream, the key is valid for 60 minutes. Do send a PUT request regularly to extend the key validity for another 60 minutes so as to keep utilizing the same connection. For more information, please refer to `Stream` module of the connector document or [User Data Streams](https://binance-docs.github.io/apidocs/spot/en/#user-data-streams) section of official API document.

### Auto Reconnect

If there is a close event not initiated by the user, the reconnection mechanism will be triggered in 5 secs.

### Custom Logger Integration

```javascript
const { Console } = require('console')
const fs = require('fs')
const Spot = require('@binance/connector')

// make sure the logs/ folder is created beforehand
const output = fs.createWriteStream('./logs/stdout.log')
const errorOutput = fs.createWriteStream('./logs/stderr.log')

const logger = new Console({ stdout: output, stderr: errorOutput })
const client = new Spot('', '', {logger})

const callbacks = {
  open: () => client.logger.log('open'),
  close: () => client.logger.log('closed'),
  message: data => client.logger.log(data)
}

const wsRef = client.aggTradeWS('bnbusdt', callbacks)
setTimeout(() => client.unsubscribe(wsRef), 5000)
// check the output file

```

The default logger defined in the package is [Node.js Console class](https://nodejs.org/api/console.html). Its output is sent to `process.stdout` and `process.stderr`, same as the global console.

Note that when the connection is initialized, the console outputs a list of callbacks in the form of `listen to event: <event_name>`.

### Testnet

While `/sapi/*` endpoints don't have testnet environment yet, `/api/*` endpoints can be tested in 
[Spot Testnet](https://testnet.binance.vision/). You can use it by changing the base URL:

```javascript
// provide the testnet base url
const client = new Spot(apiKey, apiSecret, { baseURL: 'https://testnet.binance.vision'})
```


## Test

```bash
cd <this_project_directory>

npm install

npm run test

```

## Limitation

Futures and Vanilla Options APIs are not supported:

  - `/fapi/*`
  - `/dapi/*`
  - `/vapi/*`
  -  Associated Websocket Market and User Data Streams
