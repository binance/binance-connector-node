/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow
} = require('../../testUtils/mockData')

describe('#bswapPools', () => {
  it('should get all swap pools', async () => {
    const parameters = {
      poolId: 1,
      recvWindow
    }

    nockMock(`/sapi/v1/bswap/pools${queryString({ ...parameters })}`)(responseMockData)
    return SpotClient.bswapPools(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
