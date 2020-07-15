/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#coinInfo', () => {
  it('should return coin information', async () => {
    nockMock('/sapi/v1/capital/config/getall')(responseMockData)

    return SpotClient.coinInfo().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
