'use strict'

const axios = require('axios')
const { Console } = require('console')
const constants = require('./constants')
const crypto = require('crypto')

const randomString = () => crypto.randomBytes(16).toString('hex')

const removeEmptyValue = obj => {
  if (!(obj instanceof Object)) return {}
  Object.keys(obj).forEach(key => isEmptyValue(obj[key]) && delete obj[key])
  return obj
}

const isEmptyValue = input => {
  /**
   * Scope of empty value: falsy value (except for false and 0),
   * string with white space characters only, empty object, empty array
   */
  return (!input && input !== false && input !== 0) ||
    ((typeof input === 'string' || input instanceof String) && /^\s+$/.test(input)) ||
    (input instanceof Object && !Object.keys(input).length) ||
    (Array.isArray(input) && !input.length)
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
  const { baseURL, apiKey, method, url, timeout, proxy, httpsAgent } = config
  return getRequestInstance({
    baseURL,
    timeout,
    proxy,
    httpsAgent,
    headers: {
      'Content-Type': 'application/json',
      'X-MBX-APIKEY': apiKey,
      'User-Agent': `${constants.appName}/${constants.appVersion}`
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

const defaultLogger = new Console({
  stdout: process.stdout,
  stderr: process.stderr
})

const sortObject = obj => Object.keys(obj).sort().reduce((res, key) => {
  res[key] = obj[key]
  return res
}, {})

module.exports = {
  isEmptyValue,
  removeEmptyValue,
  buildQueryString,
  createRequest,
  flowRight,
  defaultLogger,
  randomString,
  sortObject
}
