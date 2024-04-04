/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const { mockResponse } = require('../../testUtils/mockData')

const productId = '1'

describe('#getFlexiblePersonalLeftQuota', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.getFlexiblePersonalLeftQuota('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return flexible personal left quota', () => {
    const parameters = {
      productId
    }
    nockMock(`/sapi/v1/simple-earn/flexible/personalLeftQuota?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.getFlexiblePersonalLeftQuota(productId).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
