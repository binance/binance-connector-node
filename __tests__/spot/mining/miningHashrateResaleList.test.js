/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#miningHashrateResaleList', () => {
  it('should return hashrate resale list', () => {
    nockMock('/sapi/v1/mining/hash-transfer/config/details/list')(mockResponse)

    return SpotClient.miningHashrateResaleList().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
