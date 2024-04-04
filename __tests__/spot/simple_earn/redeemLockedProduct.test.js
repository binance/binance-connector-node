/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const positionId = '1'

describe('#redeemLockedProduct', () => {
  describe('throw MissingParameterError', () => {
    it('missing positionId', () => {
      expect(() => {
        SpotClient.redeemLockedProduct('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should redeem locked product', () => {
    const parameters = {
      positionId
    }
    nockPostMock(`/sapi/v1/simple-earn/locked/redeem?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.redeemLockedProduct(positionId).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
