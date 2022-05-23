/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  productId,
  recvWindow
} = require('../../testUtils/mockData')

const product = 'STAKING'

describe('#stakingRedeemProduct', () => {
  it.each([
    [null, null],
    [null, productId],
    [product, null]
  ])('should throw MissingParameterError given missing params', (product, productId) => {
    expect(() => {
      SpotClient.stakingRedeemProduct(product, productId)
    }).toThrow(MissingParameterError)
  })

  it('should redeem staking product', () => {
    const parameters = {
      recvWindow
    }
    nockPostMock(`/sapi/v1/staking/redeem?${buildQueryString({ product, productId, ...parameters })}`)(mockResponse)
    return SpotClient.stakingRedeemProduct(product, productId, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
