/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#getLockedProductPosition', () => {
  it('should return locked product position', () => {
    nockMock('/sapi/v1/simple-earn/locked/position')(mockResponse)

    return SpotClient.getLockedProductPosition().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return locked product position with params', () => {
    const parameters = {
      asset: 'USDT',
      positionId: '1',
      current: 5,
      size: 10
    }
    nockMock(`/sapi/v1/simple-earn/locked/position?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getLockedProductPosition(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
