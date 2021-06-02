/* global describe, it, expect, */
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

describe('#miningHashrateResaleList', () => {
  it('should return hashrate resale list', () => {
    nockMock('/sapi/v1/mining/hash-transfer/config/details/list')(responseMockData)

    return SpotClient.miningHashrateResaleList().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
