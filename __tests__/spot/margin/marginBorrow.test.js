/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  amount
} = require('../../testUtils/mockData')

describe('#marginBorrow', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', () => {
      expect(() => {
        SpotClient.marginBorrow('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.marginBorrow(asset, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should transfer transaction id', () => {
    const parameters = {
      asset,
      amount
    }
    nockPostMock(`/sapi/v1/margin/loan?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.marginBorrow(asset, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
