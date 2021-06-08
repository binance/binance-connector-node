/* global describe, it, expect, */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  startTime,
  endTime,
  limit,
  recvWindow
} = require('../../testUtils/mockData')

describe('#blvtRedemptionRecord', () => {
  it('should query redeem record', () => {
    const parameters = {
      id: 1,
      tokenName: 'BTCDOWN',
      startTime,
      endTime,
      limit,
      recvWindow
    }
    nockMock(`/sapi/v1/blvt/redeem/record?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.blvtRedemptionRecord(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
