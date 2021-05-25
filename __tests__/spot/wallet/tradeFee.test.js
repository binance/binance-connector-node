/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#tradeFee', () => {
  it('should return trade fee', async () => {
    nockMock('/sapi/v1/asset/tradeFee')(responseMockData)

    return SpotClient.tradeFee().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
