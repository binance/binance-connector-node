/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const productId = '1'

describe('#getRateHistory', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.getRateHistory('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return rate history', () => {
    const parameters = {
      productId
    }
    nockMock(`/sapi/v1/simple-earn/flexible/history/rateHistory?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getRateHistory(productId).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
