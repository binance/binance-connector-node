/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#queryHoldingDetailsOfThePlan', () => {
  it('should query holding details of the plan without parameter attached', () => {
    nockMock('/sapi/v1/lending/auto-invest/plan/id')(mockResponse)
    return SpotClient.queryHoldingDetailsOfThePlan().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should query holding details of the plan', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/lending/auto-invest/plan/id?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.queryHoldingDetailsOfThePlan(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
