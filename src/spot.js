const APIBase = require('./APIBase')
const Market = require('./modules/market')
const Trade = require('./modules/trade')
const Wallet = require('./modules/wallet')

class Spot extends Wallet(Market(Trade(APIBase))) {}

module.exports = Spot
