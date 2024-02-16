/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#getLockedProductList', () => {
  it('should return locked product list', () => {
    nockMock('/sapi/v1/simple-earn/locked/list')(mockResponse)

    return SpotClient.getLockedProductList().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return locked product list with params', () => {
    const parameters = {
      asset: 'USDT',
      current: 5,
      size: 10
    }
    nockMock(`/sapi/v1/simple-earn/locked/list?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getLockedProductList(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
