/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const productId = '1'

describe('#redeemFlexibleProduct', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.redeemFlexibleProduct('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should redeem flexible product', () => {
    const parameters = {
      productId
    }
    nockPostMock(`/sapi/v1/simple-earn/flexible/redeem?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.redeemFlexibleProduct(productId).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
