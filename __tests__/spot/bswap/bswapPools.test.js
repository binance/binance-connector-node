/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')
describe('#bswapPools', () => {
  it('should get all swap pools', () => {
    nockMock('/sapi/v1/bswap/pools')(mockResponse)
    return SpotClient.bswapPools().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
