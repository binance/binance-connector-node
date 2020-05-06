/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#assetDevidendRecord', () => {
  it('should return asset devidend log without parameter attached', () => {
    nockMock('/sapi/v1/asset/assetDividend')(mockResponse)

    return SpotClient.assetDevidendRecord().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return asset devidend log', () => {
    const parameters = {
      coin: 'BNB',
      status: 1
    }

    nockMock(`/sapi/v1/asset/assetDividend?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.assetDevidendRecord(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
