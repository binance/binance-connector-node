/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const product = 'STAKING'

describe('#stakingProductPosition', () => {
  it('throw MissingParameterError when missing product', () => {
    expect(() => {
      SpotClient.stakingProductPosition(null)
    }).toThrow(MissingParameterError)
  })
  it('should get staking product position', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/staking/position?${buildQueryString({ product, ...parameters })}`)(mockResponse)
    return SpotClient.stakingProductPosition(product, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
