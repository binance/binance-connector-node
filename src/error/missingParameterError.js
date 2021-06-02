const Error = require('../error/error')

class MissingParameterError extends Error {
  constructor (param) {
    super(`At least one required parameter ("${param}") is missing!`)
    this.name = 'MissingParameterError'
  }
}

module.exports = MissingParameterError
