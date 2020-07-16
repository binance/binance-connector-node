/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  symbol
} = require('../../testUtils/mockData')

describe('#marginPair', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.marginPair('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should pair details', async () => {
    const parameters = {
      symbol
    }
    nockMock(`/sapi/v1/margin/pair${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.marginPair(symbol).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
