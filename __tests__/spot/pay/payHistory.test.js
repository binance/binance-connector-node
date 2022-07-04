/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#payHistory', () => {
  it('should return pay transactions history', () => {
    nockMock('/sapi/v1/pay/transactions')(mockResponse)

    return SpotClient.payHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return pay transactions history with params', () => {
    const parameters = {
      startTime: 1637570276000,
      limit: 5
    }
    nockMock(`/sapi/v1/pay/transactions?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.payHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
