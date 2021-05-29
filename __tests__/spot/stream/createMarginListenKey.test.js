/* global describe, it, expect, */
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#createMarginListenKey', () => {
  it('should return listen key', () => {
    nockPostMock('/sapi/v1/userDataStream')(responseMockData)

    return SpotClient.createMarginListenKey().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
