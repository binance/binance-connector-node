/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#tradingStatus', () => {
  it('should return trading status', () => {
    nockMock('/sapi/v1/account/apiTradingStatus')(mockResponse)

    return SpotClient.tradingStatus().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
