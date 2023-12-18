/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const size = 100
const current = 1

describe('#getTargetAssetList', () => {
  it('should get target asset list without parameter attached', () => {
    nockMock('/sapi/v1/lending/auto-invest/target-asset/list')(mockResponse)
    return SpotClient.getTargetAssetList().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should get target asset list', () => {
    const parameters = {
      size,
      current,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/auto-invest/target-asset/list?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.getTargetAssetList(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
