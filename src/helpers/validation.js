'use strict'

const { isEmptyValue } = require('./utils')
const TimeUnit = require('../helpers/timeUnit')
const MissingParameterError = require('../error/missingParameterError')
const ConnectorClientError = require('../error/connectorClientError')

const validateRequiredParameters = paramObject => {
  if (!paramObject || isEmptyValue(paramObject)) { throw new MissingParameterError() }
  const emptyParams = []
  Object.keys(paramObject).forEach(param => {
    if (isEmptyValue(paramObject[param])) {
      emptyParams.push(param)
    }
  })
  if (emptyParams.length) { throw new MissingParameterError(emptyParams) }
}

const hasOneOfParameters = paramObject => {
  if (!paramObject || isEmptyValue(paramObject)) { throw new MissingParameterError() }
  const params = Object.values(paramObject)
  if (params.every(isEmptyValue)) {
    throw new MissingParameterError(Object.keys(paramObject))
  }
}

const validateTimeUnit = timeUnit => {
  if (!timeUnit) return
  if (
    timeUnit !== TimeUnit.MILLISECOND &&
    timeUnit !== TimeUnit.MICROSECOND &&
    timeUnit !== TimeUnit.millisecond &&
    timeUnit !== TimeUnit.microsecond
  ) {
    throw new ConnectorClientError("timeUnit must be either 'MILLISECOND' or 'MICROSECOND'")
  }
}

module.exports = {
  validateRequiredParameters,
  hasOneOfParameters,
  validateTimeUnit
}
