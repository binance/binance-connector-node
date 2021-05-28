/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#accountStatus', () => {
  it('should return account status', () => {
    nockMock('/sapi/v1/account/status')(responseMockData)

    return SpotClient.accountStatus().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
