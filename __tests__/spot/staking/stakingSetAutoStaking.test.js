/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const product = 'STAKING'
const positionId = '1234'
const renewable = 'true'

describe('#stakingSetAutoStaking', () => {
  it.each([
    [null, null, null],
    [null, positionId, renewable],
    [product, null, renewable],
    [product, positionId, null]
  ])('should throw MissingParameterError given missing params', (product, positionId, renewable) => {
    expect(() => {
      SpotClient.stakingSetAutoStaking(product, positionId, renewable)
    }).toThrow(MissingParameterError)
  })

  it('should set auto staking', () => {
    const parameters = {
      recvWindow
    }
    nockPostMock(`/sapi/v1/staking/setAutoStaking?${buildQueryString({ product, positionId, renewable, ...parameters })}`)(mockResponse)
    return SpotClient.stakingSetAutoStaking(product, positionId, renewable, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
