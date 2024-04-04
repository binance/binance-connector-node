/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#getFlexibleRedemptionRecord', () => {
  it('should return flexible redemption records', () => {
    nockMock('/sapi/v1/simple-earn/flexible/history/redemptionRecord')(mockResponse)

    return SpotClient.getFlexibleRedemptionRecord().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return flexible redemption records with params', () => {
    const parameters = {
      asset: 'USDT',
      productId: '1',
      current: 5,
      size: 10
    }
    nockMock(`/sapi/v1/simple-earn/flexible/history/redemptionRecord?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getFlexibleRedemptionRecord(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
