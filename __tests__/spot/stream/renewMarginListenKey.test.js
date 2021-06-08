/* global describe, it, expect, */
const { nockPutMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#renewMarginListenKey', () => {
  it('should renew listen key', () => {
    nockPutMock('/sapi/v1/userDataStream?listenKey=aaa')(mockResponse)

    return SpotClient.renewMarginListenKey('aaa').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
