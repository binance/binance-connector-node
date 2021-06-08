/* global describe, it, expect, */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse
} = require('../../testUtils/mockData')

describe('#depositHistory', () => {
  it('should return coin information', () => {
    const parameters = {
      coin: 'BNB',
      status: 1
    }
    nockMock(`/sapi/v1/capital/deposit/hisrec?${buildQueryString({ coin: 'BNB', status: 1 })}`)(mockResponse)

    return SpotClient.depositHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
