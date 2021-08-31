const { Console } = require('console')
const fs = require('fs')
const Spot = require('../../../src/spot')

const output = fs.createWriteStream('./stdout.log')
const errorOutput = fs.createWriteStream('./stderr.log')
const logger = new Console({
  stdout: output,
  stderr: errorOutput
})

const client = new Spot('', '', {
  logger,
  wsURL: 'wss://testnet.binance.vision' // optional, for testnet only. By default on production
})

const callbacks = {
  open: () => client.logger.debug('open'),
  close: () => client.logger.debug('closed'),
  message: data => client.logger.log(data)
}

// To generate the listen key, please check examples/spot/stream/ folder.
const wsRef = client.userData('<listen_key>', callbacks)
setTimeout(() => client.unsubscribe(wsRef), 5000)
// check the output file
