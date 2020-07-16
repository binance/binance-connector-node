/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#marginAccount', () => {
  it('should return margin account details', async () => {
    nockMock('/sapi/v1/margin/account')(responseMockData)

    return SpotClient.marginAccount().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
