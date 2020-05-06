/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#withdrawHistory', () => {
  it('should return coin information without parameter attached', () => {
    nockMock('/sapi/v1/capital/withdraw/history')(mockResponse)

    return SpotClient.withdrawHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return coin information', () => {
    const parameters = {
      coin: 'BNB',
      status: 1
    }
    nockMock(`/sapi/v1/capital/withdraw/history?${buildQueryString({ coin: 'BNB', status: 1 })}`)(mockResponse)

    return SpotClient.withdrawHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
