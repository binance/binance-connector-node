
const { buildQueryString } = require('../../src/helpers/utils')

const startTime = '1111111'
const endTime = '22222222'
const fromId = '33333'
const limit = 10
const symbol = 'BNBUSDT'
const side = 'BUY'
const type = 'LIMIT'
const quantity = 10
const price = '1000.01'
const orderId = '123456789'
const newClientOrderId = '234567890'
const recvWindow = 1000

const queryString = parameters => buildQueryString(parameters)

module.exports = {
  queryString,
  startTime,
  endTime,
  fromId,
  limit,
  symbol,
  side,
  type,
  quantity,
  price,
  orderId,
  newClientOrderId,
  recvWindow
}
