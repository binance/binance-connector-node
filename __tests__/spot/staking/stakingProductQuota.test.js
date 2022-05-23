/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  productId
} = require('../../testUtils/mockData')

const product = 'STAKING'

describe('#stakingProductQuota', () => {
  it.each([
    [null, null],
    [null, productId],
    [product, null]
  ])('should throw MissingParameterError given missing params', (product, productId) => {
    expect(() => {
      SpotClient.stakingProductQuota(product, productId)
    }).toThrow(MissingParameterError)
  })

  it('should get personal left quota of staking product', () => {
    nockMock(`/sapi/v1/staking/personalLeftQuota?${buildQueryString({ product, productId })}`)(mockResponse)
    return SpotClient.stakingProductQuota(product, productId).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
