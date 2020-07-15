/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#systemStatus', () => {
  it('should return system status', async () => {
    nockMock('/wapi/v3/systemStatus.html')(responseMockData)

    return SpotClient.systemStatus().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
