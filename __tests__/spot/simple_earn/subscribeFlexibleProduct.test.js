/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const productId = '1'
const amount = 10

describe('#subscribeFlexibleProduct', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.subscribeFlexibleProduct('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.subscribeFlexibleProduct(productId, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should subscribe flexible product', () => {
    const parameters = {
      productId,
      amount
    }
    nockPostMock(`/sapi/v1/simple-earn/flexible/subscribe?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subscribeFlexibleProduct(productId, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
