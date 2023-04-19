'use strict'

const APIBase = require('./APIBase')
const restfulModules = require('./modules/restful')
const { flowRight } = require('./helpers/utils')

class Spot extends flowRight(...Object.values(restfulModules))(APIBase) {
  constructor (apiKey = '', apiSecret = '', options = {}) {
    options.baseURL = options.baseURL || 'https://api.binance.com'
    super({
      apiKey,
      apiSecret,
      ...options
    })
  }
}

module.exports = Spot
