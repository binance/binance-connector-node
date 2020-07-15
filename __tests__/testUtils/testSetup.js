
const axios = require('axios')
const nock = require('nock')
const Spot = require('../../src/spot')
const httpAdapter = require('axios/lib/adapters/http')

const host = 'https://api.binance.com'
axios.defaults.adapter = httpAdapter

const filterPath = path => {
  const pathList = path.split('?')
  if (pathList.length <= 1) {
    return path
  }

  if (pathList.length > 1) {
    const params = pathList[1].split('&')
    const filteredParams = params.filter(param => (!param.startsWith('timestamp') && !param.startsWith('signature')))
    if (filteredParams.length > 1) {
      return `${pathList[0]}?${filteredParams.join('&')}`
    }

    // if only has timestamp and signature
    if (params.length > 1) {
      return pathList[0]
    }

    return path
  }
}

const nockMock = (urlPath) => (responseData) => {
  nock(host)
    .filteringPath(path => filterPath(path))
    .get(urlPath)
    .reply(200, responseData)
}

const nockPostMock = (urlPath) => (responseData) => {
  nock(host)
    .filteringPath(path => filterPath(path))
    .post(urlPath)
    .reply(200, responseData)
}

const nockDeleteMock = (urlPath) => (responseData) => {
  nock(host)
    .filteringPath(path => filterPath(path))
    .delete(urlPath)
    .reply(200, responseData)
}

const responseMockData = {
  key: 'value', foo: 'bar'
}

const SpotClient = new Spot()

module.exports = {
  nockMock,
  nockPostMock,
  nockDeleteMock,
  responseMockData,
  SpotClient
}
