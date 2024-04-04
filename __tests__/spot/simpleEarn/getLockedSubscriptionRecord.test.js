/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#getLockedSubscriptionRecord', () => {
  it('should return locked subscription records', () => {
    nockMock('/sapi/v1/simple-earn/locked/history/subscriptionRecord')(mockResponse)

    return SpotClient.getLockedSubscriptionRecord().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return locked subscription records with params', () => {
    const parameters = {
      asset: 'USDT',
      purchaseId: '1',
      current: 5,
      size: 10
    }
    nockMock(`/sapi/v1/simple-earn/locked/history/subscriptionRecord?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getLockedSubscriptionRecord(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
