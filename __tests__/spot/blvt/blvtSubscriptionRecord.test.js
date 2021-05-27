/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  startTime,
  endTime,
  limit,
  recvWindow
} = require('../../testUtils/mockData')

describe('#blvtSubscriptionRecord', () => {
  it('should query subscription record', async () => {
    const parameters = {
      tokenName: 'BTCDOWN',
      id: 1,
      startTime,
      endTime,
      limit,
      recvWindow
    }
    nockMock(`/sapi/v1/blvt/subscribe/record?${queryString({ ...parameters })}`)(responseMockData)
    return SpotClient.blvtSubscriptionRecord(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
