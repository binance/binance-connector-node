/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#bswapGetPoolConfig', () => {
  it('should return pool config when no parameter attached', () => {
    nockMock('/sapi/v1/bswap/poolConfigure')(mockResponse)
    return SpotClient.bswapGetPoolConfig().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return pool config', () => {
    const parameters = {
      poolId: 1,
      recvWindow
    }

    nockMock(`/sapi/v1/bswap/poolConfigure?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.bswapGetPoolConfig(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
