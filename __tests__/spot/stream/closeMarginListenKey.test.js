/* global describe, it, expect, */
const { nockDeleteMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#closeMarginListenKey', () => {
  it('should result of delete listen key', async () => {
    nockDeleteMock('/sapi/v1/userDataStream?listenKey=aaa')(responseMockData)

    return SpotClient.closeMarginListenKey('aaa').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
