const Error = require('../error/error')

class MissingParameterError extends Error {
  constructor (symbol) {
    super(`One or more of required ("${symbol}") parameters is missing!`)
    this.name = 'MissingParameterError'
  }
}

module.exports = MissingParameterError
