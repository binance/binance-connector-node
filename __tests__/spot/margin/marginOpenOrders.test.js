/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  symbol,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginOpenOrders', () => {
  it('should return margin open orders', async () => {
    const parameters = {
      symbol,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/openOrders?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.marginOpenOrders(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
