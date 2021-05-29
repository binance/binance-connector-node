const Error = require('../error/error')

class MissingParameterError extends Error {
  constructor (paramName) {
    super(`One or more of required ("${paramName}") parameters is missing!`)
    this.name = 'MissingParameterError'
  }
}

module.exports = MissingParameterError
