/* global describe, it, expect, */

const { nockMock, responseMockData, SpotClient } = require('../../helpers/testSetup')

describe('#time', () => {
  it('should return server time', async () => {
    nockMock('/api/v3/time')(responseMockData)

    return SpotClient.time().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
