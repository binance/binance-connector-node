/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const size = 100
const current = 1

describe('#querySubscriptionTransactionHistory', () => {
  it('should query subscription transaction history without parameter attached', () => {
    nockMock('/sapi/v1/lending/auto-invest/history/list')(mockResponse)
    return SpotClient.querySubscriptionTransactionHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should query subscription transaction history', () => {
    const parameters = {
      size,
      current,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/auto-invest/history/list?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.querySubscriptionTransactionHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
