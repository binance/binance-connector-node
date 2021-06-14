/* global describe, it, expect, */
const { nockPutMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#renewListenKey', () => {
  it('should renew listen key', () => {
    nockPutMock('/api/v3/userDataStream?listenKey=aaa')(mockResponse)

    return SpotClient.renewListenKey('aaa').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
