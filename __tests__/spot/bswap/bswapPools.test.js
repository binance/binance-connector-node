/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#bswapPools', () => {
  it('should get all swap pools', () => {
    nockMock('/sapi/v1/bswap/pools')(responseMockData)
    return SpotClient.bswapPools().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
