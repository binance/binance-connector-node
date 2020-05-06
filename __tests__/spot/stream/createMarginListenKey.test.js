/* global describe, it, expect */
const { nockPostMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#createMarginListenKey', () => {
  it('should return listen key', () => {
    nockPostMock('/sapi/v1/userDataStream')(mockResponse)

    return SpotClient.createMarginListenKey().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
