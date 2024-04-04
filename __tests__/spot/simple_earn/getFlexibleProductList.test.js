/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#getFlexibleProductList', () => {
  it('should return flexible product list', () => {
    nockMock('/sapi/v1/simple-earn/flexible/list')(mockResponse)

    return SpotClient.getFlexibleProductList().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return flexible product list with params', () => {
    const parameters = {
      asset: 'USDT',
      current: 5,
      size: 10
    }
    nockMock(`/sapi/v1/simple-earn/flexible/list?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getFlexibleProductList(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
