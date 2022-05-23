/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const product = 'STAKING'

describe('#stakingProductList', () => {
  it('throw MissingParameterError when missing product', () => {
    expect(() => {
      SpotClient.stakingProductList(null)
    }).toThrow(MissingParameterError)
  })
  it('should get staking product list', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/staking/productList?${buildQueryString({ product, ...parameters })}`)(mockResponse)
    return SpotClient.stakingProductList(product, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
