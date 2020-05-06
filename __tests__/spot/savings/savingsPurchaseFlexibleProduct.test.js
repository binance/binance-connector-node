/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockPostMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  productId,
  amount
} = require('../../testUtils/mockData')

describe('#savingsPurchaseFlexibleProduct', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.savingsPurchaseFlexibleProduct('', 1)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.savingsPurchaseFlexibleProduct('BNB_SAVINGS', '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return purchaseId', () => {
    nockPostMock(`/sapi/v1/lending/daily/purchase?${buildQueryString({ productId, amount })}`)(mockResponse)
    return SpotClient.savingsPurchaseFlexibleProduct(productId, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
