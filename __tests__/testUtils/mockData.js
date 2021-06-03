
const { buildQueryString } = require('../../src/helpers/utils')

const amount = 10
const startTime = '1111111'
const endTime = '22222222'
const email = 'alice@test.com'
const fromId = '33333'
const limit = 10
const lot = 10
const symbol = 'BNBUSDT'
const side = 'BUY'
const coin = 'BNB'
const asset = 'BNB'
const type = 'LIMIT'
const quantity = 10
const price = 1000.01
const productId = 'BNB_DAILY'
const projectId = 'project_id'
const stopPrice = 1001.02
const status = 'enabled'
const orderId = '123456789'
const newClientOrderId = '234567890'
const loanCoin = 'USDT'
const collateralCoin = 'BUSD'
const recvWindow = 1000

const queryString = parameters => buildQueryString(parameters)

module.exports = {
  queryString,
  amount,
  asset,
  startTime,
  coin,
  endTime,
  email,
  fromId,
  limit,
  lot,
  symbol,
  side,
  type,
  quantity,
  price,
  productId,
  projectId,
  status,
  stopPrice,
  orderId,
  newClientOrderId,
  loanCoin,
  collateralCoin,
  recvWindow
}
