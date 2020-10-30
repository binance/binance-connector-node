/* global describe, it, expect, */
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

describe('#miningCoinList', () => {
  it('should return coin list', async () => {
    nockMock('/sapi/v1/mining/pub/coinList')(responseMockData)

    return SpotClient.miningCoinList().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
