/* global describe, it, expect, */
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString
} = require('../../testUtils/mockData')

describe('#savingsFlexibleProducts', () => {
  it('should return flexible product list', () => {
    const parameters = {
      status: 'SUBSCRIBABLE',
      featured: 'ALL'
    }
    nockMock(`/sapi/v1/lending/daily/product/list?${queryString(parameters)}`)(responseMockData)

    return SpotClient.savingsFlexibleProducts(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
