/* global describe, it, expect, */
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

describe('#savingsAccount', () => {
  it('should return saving account', () => {
    nockMock('/sapi/v1/lending/union/account')(responseMockData)

    return SpotClient.savingsAccount().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
