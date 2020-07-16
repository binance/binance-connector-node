/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset
} = require('../../testUtils/mockData')

describe('#marginAsset', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', async () => {
      expect(() => {
        SpotClient.marginAsset('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should asset details', async () => {
    const parameters = {
      asset
    }
    nockMock(`/sapi/v1/margin/asset${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.marginAsset(asset).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
