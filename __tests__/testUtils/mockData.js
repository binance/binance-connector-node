const TimeUnit = require('../../src/helpers/timeUnit')

const mockResponse = {
  key: 'value', foo: 'bar'
}

module.exports = {
  mockResponse,
  aboveType: 'LIMIT_MAKER',
  amount: 10,
  asset: 'BNB',
  belowType: 'STOP_LOSS_LIMIT',
  coin: 'BNB',
  collateralCoin: 'BUSD',
  email: 'alice@test.com',
  endTime: 22222222,
  fromId: '33333',
  limit: 10,
  loanCoin: 'USDT',
  lot: 10,
  newClientOrderId: '234567890',
  orderId: '123456789',
  price: 1000.01,
  productId: 'BNB_DAILY',
  projectId: 'project_id',
  quantity: 10,
  recvWindow: 1000,
  side: 'BUY',
  startTime: 1111111,
  status: 'enabled',
  stopPrice: 1001.02,
  symbol: 'BNBUSDT',
  timeUnit: TimeUnit.MICROSECOND,
  type: 'LIMIT'
}
