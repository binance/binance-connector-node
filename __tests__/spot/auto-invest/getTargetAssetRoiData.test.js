/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const targetAsset = 'BTC'
const hisRoiType = 'FIVE_YEAR'

describe('#getTargetAssetRoiData', () => {
  it.each([
    [null, null],
    [null, hisRoiType],
    [targetAsset, null]
  ])('should throw MissingParameterError given missing params', (targetAsset, hisRoiType) => {
    expect(() => {
      SpotClient.getTargetAssetRoiData(targetAsset, hisRoiType)
    }).toThrow(MissingParameterError)
  })

  it('should get target asset roi data', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/lending/auto-invest/target-asset/roi/list?${buildQueryString({ targetAsset, hisRoiType, ...parameters })}`)(mockResponse)
    return SpotClient.getTargetAssetRoiData(targetAsset, hisRoiType, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
