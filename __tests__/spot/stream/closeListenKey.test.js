/* global describe, it, expect, */
const { nockDeleteMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#closeListenKey', () => {
  it('should result of delete listen key', async () => {
    nockDeleteMock('/api/v3/userDataStream?listenKey=aaa')(responseMockData)

    return SpotClient.closeListenKey('aaa').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
