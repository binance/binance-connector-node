/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#subAccountTransferHistory', () => {
  it('should return sub account transfer history when no parameter attached', () => {
    nockMock('/sapi/v1/sub-account/sub/transfer/history')(mockResponse)

    return SpotClient.subAccountTransferHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return sub account transfer history', () => {
    const parameters = {
      toEmail: 'bob@test.com',
      recvWindow
    }

    nockMock(`/sapi/v1/sub-account/sub/transfer/history?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountTransferHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
