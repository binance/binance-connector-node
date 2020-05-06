/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#tradeFee', () => {
  it('should return trade fee', () => {
    nockMock('/sapi/v1/asset/tradeFee')(mockResponse)

    return SpotClient.tradeFee().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
