/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#futuresLoanInterestHistory', () => {
  it('should get cross collateral interest history', () => {
    nockMock('/sapi/v1/futures/loan/interestHistory')(mockResponse)

    return SpotClient.futuresLoanInterestHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
