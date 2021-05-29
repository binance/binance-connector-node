/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#account', () => {
  it('should return account info', () => {
    nockMock('/api/v3/account')(responseMockData)

    return SpotClient.account().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
