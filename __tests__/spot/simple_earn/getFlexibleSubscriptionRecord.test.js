/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#getFlexibleSubscriptionRecord', () => {
  it('should return flexible subscription records', () => {
    nockMock('/sapi/v1/simple-earn/flexible/history/subscriptionRecord')(mockResponse)

    return SpotClient.getFlexibleSubscriptionRecord().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return flexible subscription records with params', () => {
    const parameters = {
      asset: 'USDT',
      purchaseId: '1',
      current: 5,
      size: 10
    }
    nockMock(`/sapi/v1/simple-earn/flexible/history/subscriptionRecord?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getFlexibleSubscriptionRecord(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
