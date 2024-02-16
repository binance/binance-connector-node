/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const { mockResponse } = require('../../testUtils/mockData')

const productId = '1'

describe('#getCollateralRecord', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.getCollateralRecord('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should suscribe locked product', () => {
    const parameters = {
      productId
    }
    nockMock(`/sapi/v1/simple-earn/flexible/history/collateralRecord?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getCollateralRecord(productId).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
