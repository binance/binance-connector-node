/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#tradingStatus', () => {
  it('should return trading status', async () => {
    nockMock('/wapi/v3/apiTradingStatus.html')(responseMockData)

    return SpotClient.tradingStatus().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
