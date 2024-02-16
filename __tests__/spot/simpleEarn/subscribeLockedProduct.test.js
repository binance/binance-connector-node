/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const { mockResponse } = require('../../testUtils/mockData')

const productId = '1'
const amount = 10

describe('#subscribeLockedProduct', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.subscribeLockedProduct('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.subscribeLockedProduct(productId, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should suscribe locked product', () => {
    const parameters = {
      productId,
      amount
    }
    nockPostMock(`/sapi/v1/simple-earn/locked/subscribe?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subscribeLockedProduct(productId, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
