/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#accountStatus', () => {
  it('should return account status', () => {
    nockMock('/sapi/v1/account/status')(mockResponse)

    return SpotClient.accountStatus().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
