const Error = require('../error/error')

class MissingParameterError extends Error {
  constructor (paramName) {
    super(`At least one required parameter ("${paramName}") is missing!`)
    this.name = 'MissingParameterError'
  }
}

module.exports = MissingParameterError
