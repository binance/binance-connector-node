/* global describe, it, expect */
const { nockPostMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#createListenKey', () => {
  it('should return listen key', () => {
    nockPostMock('/api/v3/userDataStream')(mockResponse)

    return SpotClient.createListenKey().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
