/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  startTime
} = require('../../testUtils/mockData')

describe('#subAccountUniversalTransferHistory', () => {
  it('should get universal transfer history', () => {
    const parameters = {
      startTime,
      recvWindow
    }

    nockMock(`/sapi/v1/sub-account/universalTransfer?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountUniversalTransferHistory({ startTime, recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should get universal transfer history without optional params', () => {
    nockMock(`/sapi/v1/sub-account/universalTransfer?${buildQueryString()}`)(mockResponse)

    return SpotClient.subAccountUniversalTransferHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
