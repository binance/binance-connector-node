/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const productId = '1'
const amount = 10

describe('#getFlexibleSubscriptionPreview', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.getFlexibleSubscriptionPreview('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.getFlexibleSubscriptionPreview(productId, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return flexible subscription previews', () => {
    const parameters = {
      productId,
      amount
    }
    nockMock(`/sapi/v1/simple-earn/flexible/subscriptionPreview?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.getFlexibleSubscriptionPreview(productId, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
