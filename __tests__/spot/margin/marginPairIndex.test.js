/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  symbol
} = require('../../testUtils/mockData')

describe('#marginPairIndex', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.marginPairIndex('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return pair index', async () => {
    const parameters = {
      symbol
    }
    nockMock(`/sapi/v1/margin/priceIndex${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.marginPairIndex(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
