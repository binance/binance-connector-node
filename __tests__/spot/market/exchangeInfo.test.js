/* global describe, it, expect, */

const { nockMock, responseMockData, SpotClient } = require('../../helpers/testSetup')

describe('#exchangeInfo', () => {
  it('should return exchange info', async () => {
    nockMock('/api/v3/exchangeInfo')(responseMockData)

    return SpotClient.exchangeInfo().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
