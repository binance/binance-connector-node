
const MissingParameterError = require('../error/missingParameterError')

const validateParameter = (param, paramName) => {
  if (param === undefined || param === '') {
    throw new MissingParameterError(paramName)
  }
}

module.exports = {
  validateParameter
}
