const axios = require('axios')
const bunyan = require('bunyan')
const { appName } = require('./constants')

const removeEmptyValue = obj => {
  if (!(obj instanceof Object)) return {}
  Object.keys(obj).forEach(key =>
    (!obj[key] && obj[key] !== false && obj[key] !== 0) &&
    delete obj[key])
  return obj
}

const buildQueryString = params => {
  if (!params) return ''
  return Object.entries(params)
    .map(stringifyKeyValuePair)
    .join('&')
}

/**
 * NOTE: The array conversion logic is different from usual query string.
 * E.g. symbols=["BTCUSDT","BNBBTC"] instead of symbols[]=BTCUSDT&symbols[]=BNBBTC
 */
const stringifyKeyValuePair = ([key, value]) => {
  const valueString = Array.isArray(value) ? `["${value.join('","')}"]` : value
  return `${key}=${encodeURIComponent(valueString)}`
}

const getRequestInstance = (config) => {
  return axios.create({
    ...config
  })
}

const createRequest = (config) => {
  const { baseURL, apiKey, method, url } = config
  return getRequestInstance({
    baseURL,
    headers: {
      'content-type': 'application/json',
      'X-MBX-APIKEY': apiKey
    }
  }).request({
    method,
    url
  })
}

const flowRight = (...functions) => input => functions.reduceRight(
  (input, fn) => fn(input),
  input
)

const defaultLogger = bunyan.createLogger({ name: appName })

module.exports = {
  removeEmptyValue,
  buildQueryString,
  createRequest,
  flowRight,
  defaultLogger
}
