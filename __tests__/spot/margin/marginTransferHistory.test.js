/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#marginTransferHistory', () => {
  it('should return transfer history', () => {
    nockMock('/sapi/v1/margin/transfer')(mockResponse)

    return SpotClient.marginTransferHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
