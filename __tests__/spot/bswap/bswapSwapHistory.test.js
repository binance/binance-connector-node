/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  startTime,
  endTime,
  recvWindow
} = require('../../testUtils/mockData')

describe('#bswapSwapHistory', () => {
  it('should get swap history without parameter attached', () => {
    nockMock('/sapi/v1/bswap/swap')(mockResponse)
    return SpotClient.bswapSwapHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should get swap history', () => {
    const parameters = {
      swapId: 1,
      startTime,
      endTime,
      status: 0,
      recvWindow
    }

    nockMock(`/sapi/v1/bswap/swap?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.bswapSwapHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
