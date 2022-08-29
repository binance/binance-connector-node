/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse, recvWindow } = require('../../testUtils/mockData')

describe('#rebateSpotHistory', () => {
  it('should return spot rebate history', () => {
    nockMock('/sapi/v1/rebate/taxQuery')(mockResponse)

    return SpotClient.rebateSpotHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return spot rebate history with optional params', () => {
    const parameters = {
      startTime: 1636541539000,
      endTime: 1638442339000,
      recvWindow
    }
    nockMock(`/sapi/v1/rebate/taxQuery?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.rebateSpotHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
