/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, timeUnit } = require('../../testUtils/mockData')

describe('#account', () => {
  it('should return account info', () => {
    nockMock('/api/v3/account')(mockResponse)

    return SpotClient.account({ timeUnit }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return account info without optional parameters', () => {
    nockMock('/api/v3/account')(mockResponse)

    return SpotClient.account().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
