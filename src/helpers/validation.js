
const MissingParameterError = require('../error/missingParameterError')

const validateParameter = (param, paramName) => {
  if (!param && param !== 0 && param !== false) {
    throw new MissingParameterError(paramName)
  }
}

module.exports = {
  validateParameter
}
