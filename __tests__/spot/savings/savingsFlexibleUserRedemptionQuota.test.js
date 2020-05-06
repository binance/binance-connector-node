/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  productId
} = require('../../testUtils/mockData')

describe('#savingsFlexibleUserRedemptionQuota', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.savingsFlexibleUserRedemptionQuota('', 'FAST')
      }).toThrow(MissingParameterError)
    })

    it('missing type', () => {
      expect(() => {
        SpotClient.savingsFlexibleUserRedemptionQuota('BNB_SAVINGS', '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return flexible product quota', () => {
    nockMock(`/sapi/v1/lending/daily/userRedemptionQuota?${buildQueryString({ productId, type: 'FAST' })}`)(mockResponse)
    return SpotClient.savingsFlexibleUserRedemptionQuota(productId, 'FAST').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
