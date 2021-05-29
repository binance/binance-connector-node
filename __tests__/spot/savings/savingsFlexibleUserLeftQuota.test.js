/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  productId,
  recvWindow
} = require('../../testUtils/mockData')

describe('#savingsFlexibleUserLeftQuota', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.savingsFlexibleUserLeftQuota('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return Left Daily Purchase Quota of Flexible Product', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/lending/daily/userLeftQuota?${queryString({ productId, ...parameters })}`)(responseMockData)

    return SpotClient.savingsFlexibleUserLeftQuota(productId, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
