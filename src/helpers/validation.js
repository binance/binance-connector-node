const { isEmptyValue } = require('./utils')
const MissingParameterError = require('../error/missingParameterError')

const validateParameter = (param, paramName) => {
  if (isEmptyValue(param)) {
    throw new MissingParameterError(paramName)
  }
}

module.exports = {
  validateParameter
}
