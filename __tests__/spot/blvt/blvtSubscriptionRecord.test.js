/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  startTime,
  endTime,
  limit,
  recvWindow
} = require('../../testUtils/mockData')

describe('#blvtSubscriptionRecord', () => {
  it('should query subscription record without parameter attached', () => {
    nockMock('/sapi/v1/blvt/subscribe/record?')(mockResponse)
    return SpotClient.blvtSubscriptionRecord().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should query subscription record', () => {
    const parameters = {
      tokenName: 'BTCDOWN',
      id: 1,
      startTime,
      endTime,
      limit,
      recvWindow
    }
    nockMock(`/sapi/v1/blvt/subscribe/record?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.blvtSubscriptionRecord(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
