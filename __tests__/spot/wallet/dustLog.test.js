/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#dustLog', () => {
  it('should return account dust log', async () => {
    nockMock('/sapi/v1/asset/dribblet')(responseMockData)

    return SpotClient.dustLog().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
