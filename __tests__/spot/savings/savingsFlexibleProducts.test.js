/* global describe, it, expect */
const {
  nockMock,
  SpotClient,
  buildQueryString
} = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#savingsFlexibleProducts', () => {
  it('should return flexible product list when no parameter attached', () => {
    nockMock('/sapi/v1/lending/daily/product/list')(mockResponse)

    return SpotClient.savingsFlexibleProducts().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return flexible product list', () => {
    const parameters = {
      status: 'SUBSCRIBABLE',
      featured: 'ALL'
    }
    nockMock(`/sapi/v1/lending/daily/product/list?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.savingsFlexibleProducts(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
