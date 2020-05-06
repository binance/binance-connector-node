/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  asset
} = require('../../testUtils/mockData')

describe('#subAccountTransferSubAccountHistory', () => {
  it('should get sub account transfer history when no parameter attached', () => {
    nockMock('/sapi/v1/sub-account/transfer/subUserHistory')(mockResponse)

    return SpotClient.subAccountTransferSubAccountHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should get sub account transfer history', () => {
    const parameters = {
      asset,
      type: 1,
      recvWindow
    }

    nockMock(`/sapi/v1/sub-account/transfer/subUserHistory?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountTransferSubAccountHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
