/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#savingsAccount', () => {
  it('should return saving account', () => {
    nockMock('/sapi/v1/lending/union/account')(mockResponse)

    return SpotClient.savingsAccount().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
