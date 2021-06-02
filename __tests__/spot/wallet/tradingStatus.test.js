/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#tradingStatus', () => {
  it('should return trading status', () => {
    nockMock('/sapi/v1/account/apiTradingStatus')(responseMockData)

    return SpotClient.tradingStatus().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
