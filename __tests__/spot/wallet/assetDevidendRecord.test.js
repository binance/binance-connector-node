/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')
const { queryString } = require('../../testUtils/mockData')

describe('#assetDevidendRecord', () => {
  it('should return asset devidend log', () => {
    const parameters = {
      coin: 'BNB',
      status: 1
    }

    nockMock(`/sapi/v1/asset/assetDividend?${queryString(parameters)}`)(responseMockData)

    return SpotClient.assetDevidendRecord(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
