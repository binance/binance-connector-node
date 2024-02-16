/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#getSimpleAccount', () => {
  it('should return simple account details', () => {
    nockMock('/sapi/v1/simple-earn/account')(mockResponse)

    return SpotClient.getSimpleAccount().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return simple account details with params', () => {
    const parameters = {
      recvWindow: 1000
    }
    nockMock(`/sapi/v1/simple-earn/account?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getSimpleAccount(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
