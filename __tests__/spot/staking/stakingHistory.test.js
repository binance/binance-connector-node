/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const product = 'STAKING'
const txnType = 'SUBSCRIPTION'

describe('#stakingHistory', () => {
  it.each([
    [null, null],
    [null, txnType],
    [product, null]
  ])('should throw MissingParameterError given missing params', (product, txnType) => {
    expect(() => {
      SpotClient.stakingHistory(product, txnType)
    }).toThrow(MissingParameterError)
  })

  it('should get staking history', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/staking/stakingRecord?${buildQueryString({ product, txnType, ...parameters })}`)(mockResponse)
    return SpotClient.stakingHistory(product, txnType, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
