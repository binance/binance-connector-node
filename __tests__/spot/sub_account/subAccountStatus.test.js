/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountStatus', () => {
  it('should return sub account status without parameter attached', () => {
    nockMock(`/sapi/v1/sub-account/status?${buildQueryString()}`)(mockResponse)

    return SpotClient.subAccountStatus().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return sub account status', () => {
    const parameters = {
      email,
      recvWindow
    }
    nockMock(`/sapi/v1/sub-account/status?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountStatus(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
