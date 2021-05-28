/* global describe, it, expect, */
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#createListenKey', () => {
  it('should return listen key', () => {
    nockPostMock('/api/v3/userDataStream')(responseMockData)

    return SpotClient.createListenKey().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
