/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#getFlexibleProductPosition', () => {
  it('should return flexible product position', () => {
    nockMock('/sapi/v1/simple-earn/flexible/position')(mockResponse)

    return SpotClient.getFlexibleProductPosition().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return flexible product position with params', () => {
    const parameters = {
      asset: 'USDT',
      productId: '1',
      current: 5,
      size: 10
    }
    nockMock(`/sapi/v1/simple-earn/flexible/position?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getFlexibleProductPosition(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
