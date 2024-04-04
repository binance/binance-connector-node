/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#getLockedRewardsRecord', () => {
  it('should return locked records history', () => {
    nockMock('/sapi/v1/simple-earn/locked/history/rewardsRecord')(mockResponse)

    return SpotClient.getLockedRewardsRecord().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return locked records history with params', () => {
    const parameters = {
      asset: 'USDT',
      positionId: '1',
      current: 5,
      size: 10
    }
    nockMock(`/sapi/v1/simple-earn/locked/history/rewardsRecord?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getLockedRewardsRecord(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
