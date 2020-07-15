/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#accountStatus', () => {
  it('should return account status', async () => {
    nockMock('/wapi/v3/accountStatus.html')(responseMockData)

    return SpotClient.accountStatus().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
