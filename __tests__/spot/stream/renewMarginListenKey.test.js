/* global describe, it, expect, */
const { nockPutMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#renewMarginListenKey', () => {
  it('should renew listen key', () => {
    nockPutMock('/sapi/v1/userDataStream?listenKey=aaa')(responseMockData)

    return SpotClient.renewMarginListenKey('aaa').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
