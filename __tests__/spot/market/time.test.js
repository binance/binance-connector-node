/* global describe, it, expect, */

const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#time', () => {
  it('should return server time', () => {
    nockMock('/api/v3/time')(responseMockData)

    return SpotClient.time().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
