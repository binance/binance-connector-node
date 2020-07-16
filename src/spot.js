const APIBase = require('./APIBase')
const Market = require('./modules/market')
const Trade = require('./modules/trade')
const Wallet = require('./modules/wallet')
const Margin = require('./modules/margin')

class Spot extends Margin(Wallet(Market(Trade(APIBase)))) {}

module.exports = Spot
