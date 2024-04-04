/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#getLockedRedemptionRecord', () => {
  it('should return locked redemption records', () => {
    nockMock('/sapi/v1/simple-earn/locked/history/redemptionRecord')(mockResponse)

    return SpotClient.getLockedRedemptionRecord().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return locked redemption records with params', () => {
    const parameters = {
      asset: 'USDT',
      positionId: '1',
      current: 5,
      size: 10
    }
    nockMock(`/sapi/v1/simple-earn/locked/history/redemptionRecord?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getLockedRedemptionRecord(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
