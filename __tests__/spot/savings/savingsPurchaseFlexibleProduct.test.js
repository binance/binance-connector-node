/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockPostMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  productId,
  amount
} = require('../../testUtils/mockData')

describe('#savingsPurchaseFlexibleProduct', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', async () => {
      expect(() => {
        SpotClient.savingsPurchaseFlexibleProduct('', 1)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', async () => {
      expect(() => {
        SpotClient.savingsPurchaseFlexibleProduct('BNB_SAVINGS', '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return purchaseId', async () => {
    nockPostMock(`/sapi/v1/lending/daily/purchase?${queryString({ productId, amount })}`)(responseMockData)

    return SpotClient.savingsPurchaseFlexibleProduct(productId, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
