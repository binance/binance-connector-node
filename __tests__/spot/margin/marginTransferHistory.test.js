/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#marginTransferHistory', () => {
  it('should return transfer history', () => {
    nockMock('/sapi/v1/margin/transfer')(responseMockData)

    return SpotClient.marginTransferHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
