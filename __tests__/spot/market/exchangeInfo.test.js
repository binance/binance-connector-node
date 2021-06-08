/* global describe, it, expect, */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#exchangeInfo', () => {
  it('should return exchange info', () => {
    nockMock('/api/v3/exchangeInfo')(mockResponse)

    return SpotClient.exchangeInfo().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
