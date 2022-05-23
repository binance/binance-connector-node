/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  productId,
  amount,
  recvWindow
} = require('../../testUtils/mockData')

const product = 'STAKING'

describe('#stakingPurchaseProduct', () => {
  it.each([
    [null, null, null],
    [null, productId, amount],
    [product, null, amount],
    [product, productId, null]
  ])('should throw MissingParameterError given missing params', (product, productId, amount) => {
    expect(() => {
      SpotClient.stakingPurchaseProduct(product, productId, amount)
    }).toThrow(MissingParameterError)
  })

  it('should purchase staking product', () => {
    const parameters = {
      recvWindow
    }
    nockPostMock(`/sapi/v1/staking/purchase?${buildQueryString({ product, productId, amount, ...parameters })}`)(mockResponse)
    return SpotClient.stakingPurchaseProduct(product, productId, amount, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
