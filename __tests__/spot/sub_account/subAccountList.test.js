/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const {
  mockResponse,
  recvWindow,
  status
} = require('../../testUtils/mockData')

describe('#subAccountList', () => {
  it('should return sub account list when no parameter attached', () => {
    nockMock('/sapi/v1/sub-account/list')(mockResponse)

    return SpotClient.subAccountList().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return sub account list', () => {
    const parameters = {
      status,
      recvWindow
    }
    nockMock(`/sapi/v1/sub-account/list?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountList(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
