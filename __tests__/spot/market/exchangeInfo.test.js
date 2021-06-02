/* global describe, it, expect, */

const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#exchangeInfo', () => {
  it('should return exchange info', () => {
    nockMock('/api/v3/exchangeInfo')(responseMockData)

    return SpotClient.exchangeInfo().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
