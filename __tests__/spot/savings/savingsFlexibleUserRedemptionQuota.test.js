/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  productId
} = require('../../testUtils/mockData')

describe('#savingsFlexibleUserRedemptionQuota', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', async () => {
      expect(() => {
        SpotClient.savingsFlexibleUserRedemptionQuota('', 'FAST')
      }).toThrow(MissingParameterError)
    })

    it('missing type', async () => {
      expect(() => {
        SpotClient.savingsFlexibleUserRedemptionQuota('BNB_SAVINGS', '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return flexible product quota', async () => {
    nockMock(`/sapi/v1/lending/daily/userRedemptionQuota?${queryString({ productId, type: 'FAST' })}`)(responseMockData)

    return SpotClient.savingsFlexibleUserRedemptionQuota(productId, 'FAST').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
