/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const productId = '1'
const autoSubscribe = true

describe('#setFlexibleAutoSubscribe', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.setFlexibleAutoSubscribe('', autoSubscribe)
      }).toThrow(MissingParameterError)
    })

    it('missing autoSubscribe', () => {
      expect(() => {
        SpotClient.setFlexibleAutoSubscribe(productId, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should suscribe flexible product', () => {
    const parameters = {
      productId,
      autoSubscribe
    }
    nockPostMock(`/sapi/v1/simple-earn/flexible/setAutoSubscribe?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.setFlexibleAutoSubscribe(productId, autoSubscribe).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
