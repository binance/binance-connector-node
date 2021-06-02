
const MissingParameterError = require('../error/missingParameterError')

const validateParameter = (param, paramName) => {
  if (param === undefined || param === '') {
    throw new MissingParameterError(paramName)
  }
}

const hasOneOfParameters = (param, paramName, param2, paramName2) => {
  if ((param === undefined || param === '') && (param2 === undefined || param2 === '')) {
    throw new MissingParameterError(paramName + ', ' + paramName2)
  }
}

module.exports = {
  validateParameter,
  hasOneOfParameters
}
