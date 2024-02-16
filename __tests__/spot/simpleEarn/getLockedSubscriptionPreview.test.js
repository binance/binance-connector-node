/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const { mockResponse } = require('../../testUtils/mockData')

const productId = '1'
const amount = 10

describe('#getLockedSubscriptionPreview', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.getLockedSubscriptionPreview('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.getLockedSubscriptionPreview(productId, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should suscribe locked product', () => {
    const parameters = {
      productId,
      amount
    }
    nockMock(`/sapi/v1/simple-earn/locked/subscriptionPreview?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.getLockedSubscriptionPreview(productId, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
