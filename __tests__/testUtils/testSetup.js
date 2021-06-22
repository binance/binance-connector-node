const axios = require('axios')
const nock = require('nock')
const Spot = require('../../src/spot')
const httpAdapter = require('axios/lib/adapters/http')
const { buildQueryString } = require('../../src/helpers/utils')

const host = 'https://api.binance.com'
axios.defaults.adapter = httpAdapter

const filterPath = path => {
  const pathList = path.split('?')
  if (pathList.length <= 1) {
    return path
  }
  const params = pathList[1].split('&')
  const filteredParams = params.filter(param =>
    !param.startsWith('timestamp') && !param.startsWith('signature'))
  return filteredParams.length >= 1
    ? `${pathList[0]}?${filteredParams.join('&')}`
    : pathList[0]
}

const nockMock = urlPath => responseData => {
  nock(host)
    .filteringPath(path => filterPath(path))
    .get(urlPath)
    .reply(200, responseData)
}

const nockPostMock = urlPath => responseData => {
  nock(host)
    .filteringPath(path => filterPath(path))
    .post(urlPath)
    .reply(200, responseData)
}

const nockDeleteMock = urlPath => responseData => {
  nock(host)
    .filteringPath(path => filterPath(path))
    .delete(urlPath)
    .reply(200, responseData)
}

const nockPutMock = urlPath => responseData => {
  nock(host)
    .filteringPath(path => filterPath(path))
    .put(urlPath)
    .reply(200, responseData)
}

const SpotClient = new Spot()

const mockSubscription = (targetUrl, mockResponse) => {
  SpotClient.subscribe = new Proxy(SpotClient.subscribe, {
    apply: function (target, thisArg, [url, callback]) {
      targetUrl = targetUrl.replace('?', '\\?')
      if (url.match(new RegExp(`${targetUrl}$`))) {
        return callback(null, mockResponse)
      }
      return callback(new Error('URL mismatch'))
    }
  })
}

const mockConnection = (classInstance, streamMethod, ...args) => testScenarios => {
  const messages = []
  const messageCallback = (err, data) => {
    if (err) messages.push(err)
    else messages.push(data)
  }
  classInstance[streamMethod](...args, messageCallback)
  return testScenarios(messages)
}

module.exports = {
  nockMock,
  nockPostMock,
  nockDeleteMock,
  nockPutMock,
  buildQueryString,
  mockSubscription,
  mockConnection,
  SpotClient
}
