const APIBase = require('./APIBase')
const Market = require('./modules/market')
const Trade = require('./modules/trade')

class Spot extends Market(Trade(APIBase)) {}

module.exports = Spot
