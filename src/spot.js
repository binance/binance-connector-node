const APIBase = require('./APIBase')
const Market = require('./modules/market')
const Trade = require('./modules/trade')
const Wallet = require('./modules/wallet')
const Margin = require('./modules/margin')
const Savings = require('./modules/savings')
const Stream = require('./modules/stream')

class Spot extends Stream(Savings(Margin(Wallet(Market(Trade(APIBase)))))) {}

module.exports = Spot
