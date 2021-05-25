const axios = require('axios')
const bunyan = require('bunyan')
const { appName } = require('./constants')

const cleanEmptyObject = obj => {
  Object.keys(obj).forEach((key) => (obj[key] == null || obj[key] === '') && delete obj[key])
  return obj
}

const buildQueryString = (q) => (q ? `?${Object.keys(q)
  .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(q[k])}`)
  .join('&')}` : '')

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

const stringify = (params) => {
  return Object.entries(params).map(entry => `${entry[0]}=${entry[1]}`).join('&')
}

const defaultLogger = bunyan.createLogger({ name: appName })

module.exports = {
  cleanEmptyObject,
  buildQueryString,
  createRequest,
  defaultLogger,
  stringify
}
