/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const projectId = '1'
const amount = 10

describe('#subscribeLockedProduct', () => {
  describe('throw MissingParameterError', () => {
    it('missing projectId', () => {
      expect(() => {
        SpotClient.subscribeLockedProduct('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.subscribeLockedProduct(projectId, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should subscribe locked product', () => {
    const parameters = {
      projectId,
      amount
    }
    nockPostMock(`/sapi/v1/simple-earn/locked/subscribe?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subscribeLockedProduct(projectId, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
