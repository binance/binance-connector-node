/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  coin,
  recvWindow
} = require('../../testUtils/mockData')

describe('#depositAddress', () => {
  it('throw MissingParameterError when missing coin', () => {
    expect(() => {
      SpotClient.depositAddress('')
    }).toThrow(MissingParameterError)
  })

  it('should return coin deposit address', () => {
    const parameters = {
      network: 'BNB',
      recvWindow
    }
    nockMock(`/sapi/v1/capital/deposit/address?${buildQueryString({ coin, ...parameters })}`)(mockResponse)

    return SpotClient.depositAddress(coin, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
