const nock = require('nock')
const Spot = require('../../src/spot')
const WebsocketStream = require('../../src/websocketStream')
const { buildQueryString } = require('../../src/helpers/utils')

const host = 'https://api.binance.com'

const SpotClient = new Spot()

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

const websocketStreamClient = new WebsocketStream()

const mockSubscription = (targetUrl, mockResponse) => {
  websocketStreamClient.subscribe = new Proxy(websocketStreamClient.subscribe, {
    apply: function (target, thisArg, [url]) {
      targetUrl = targetUrl.replace('?', '\\?')
      if (url.match(new RegExp(`${targetUrl}$`))) {
        return mockResponse
      }
      console.log(url)
      return new Error('URL mismatch')
    }
  })
}

module.exports = {
  nockMock,
  nockPostMock,
  nockDeleteMock,
  nockPutMock,
  buildQueryString,
  mockSubscription,
  SpotClient,
  websocketStreamClient
}
