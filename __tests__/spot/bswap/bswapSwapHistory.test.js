/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  startTime,
  endTime,
  recvWindow
} = require('../../testUtils/mockData')

const swapId = 1
const status = 0

describe('#bswapSwapHistory', () => {
  it('should get swap history', () => {
    const parameters = {
      swapId,
      startTime,
      endTime,
      status,
      recvWindow
    }

    nockMock(`/sapi/v1/bswap/swap?${queryString({ ...parameters })}`)(responseMockData)
    return SpotClient.bswapSwapHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
