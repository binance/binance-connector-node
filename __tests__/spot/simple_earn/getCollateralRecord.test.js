/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#getCollateralRecord', () => {
  it('should return collateral records', () => {
    nockMock('/sapi/v1/simple-earn/flexible/history/collateralRecord')(mockResponse)

    return SpotClient.getCollateralRecord().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
  it('should return collateral records with params', () => {
    const parameters = {
      productId: '1'
    }
    nockMock(`/sapi/v1/simple-earn/flexible/history/collateralRecord?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getCollateralRecord(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
