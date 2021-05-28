/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  queryString,
  coin,
  recvWindow
} = require('../../testUtils/mockData')

describe('#depositAddress', () => {
  describe('throw MissingParameterError', () => {
    it('missing coin', async () => {
      expect(() => {
        SpotClient.depositAddress('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return coin deposit address', async () => {
    const parameters = {
      network: 'BNB',
      recvWindow
    }
    nockMock(`/sapi/v1/capital/deposit/address?${queryString({ coin, ...parameters })}`)(responseMockData)

    return SpotClient.depositAddress(coin, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
