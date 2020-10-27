/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  id,
  startTime,
  endTime,
  limit,
  recvWindow
} = require('../../testUtils/mockData')

const tokenName = 'BTCDOWN'

describe('#blvtRedemptionRecord', () => {
  it('should query redeem record', async () => {
    const parameters = {
      tokenName,
      id,
      startTime,
      endTime,
      limit,
      recvWindow
    }
    nockMock(`/sapi/v1/blvt/redeem/record${queryString({ ...parameters })}`)(responseMockData)
    return SpotClient.blvtRedemptionRecord(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
