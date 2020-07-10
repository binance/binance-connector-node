
const axios = require('axios')
const nock = require('nock')
const Spot = require('../../src/spot')
const httpAdapter = require('axios/lib/adapters/http')

const host = 'https://api.binance.com'
axios.defaults.adapter = httpAdapter

const nockMock = (urlPath) => (responseData) => {
  nock(host)
    .get(urlPath)
    .reply(200, responseData)
}

const responseMockData = {
  key: 'value', foo: 'bar'
}

const SpotClient = new Spot()

module.exports = {
  nockMock,
  responseMockData,
  SpotClient
}
