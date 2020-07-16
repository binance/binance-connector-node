/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginMaxTransferable', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', async () => {
      expect(() => {
        SpotClient.marginMaxTransferable('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return max transfer amount', async () => {
    const parameters = {
      asset,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/maxTransferable${queryString({ asset, ...parameters })}`)(responseMockData)

    return SpotClient.marginMaxTransferable(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
