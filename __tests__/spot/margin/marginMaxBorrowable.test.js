/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginMaxBorrowable', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', async () => {
      expect(() => {
        SpotClient.marginMaxBorrowable('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return max borrowable funds', async () => {
    const parameters = {
      asset,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/maxBorrowable?${queryString({ asset, ...parameters })}`)(responseMockData)

    return SpotClient.marginMaxBorrowable(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
