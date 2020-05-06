/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  amount
} = require('../../testUtils/mockData')

describe('#marginRepay', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', () => {
      expect(() => {
        SpotClient.marginRepay('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.marginRepay(asset, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should transfer transaction id', () => {
    const parameters = {
      asset,
      amount
    }
    nockPostMock(`/sapi/v1/margin/repay?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.marginRepay(asset, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
