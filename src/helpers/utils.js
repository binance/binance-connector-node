const axios = require('axios')

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

module.exports = {
  cleanEmptyObject,
  buildQueryString,
  getRequestInstance
}
