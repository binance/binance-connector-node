/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const projectId = '1'
const amount = 10

describe('#getLockedSubscriptionPreview', () => {
  describe('throw MissingParameterError', () => {
    it('missing projectId', () => {
      expect(() => {
        SpotClient.getLockedSubscriptionPreview('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.getLockedSubscriptionPreview(projectId, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return locked subscription preview', () => {
    const parameters = {
      projectId,
      amount
    }
    nockMock(`/sapi/v1/simple-earn/locked/subscriptionPreview?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.getLockedSubscriptionPreview(projectId, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
