/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#tradeFee', () => {
  it('should return trade fee', async () => {
    nockMock('/wapi/v3/tradeFee.html')(responseMockData)

    return SpotClient.tradeFee().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
