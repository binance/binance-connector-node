/* global describe, it, expect, */
const { nockPutMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#renewListenKey', () => {
  it('should renew listen key', async () => {
    nockPutMock('/api/v3/userDataStream?listenKey=aaa')(responseMockData)

    return SpotClient.renewListenKey('aaa').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
