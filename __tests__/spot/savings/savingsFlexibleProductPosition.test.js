/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#savingsFlexibleProductPosition', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', () => {
      expect(() => {
        SpotClient.savingsFlexibleProductPosition('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should get flexible product position', () => {
    nockMock(`/sapi/v1/lending/daily/token/position?${buildQueryString({ asset, recvWindow })}`)(mockResponse)

    return SpotClient.savingsFlexibleProductPosition(asset, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
