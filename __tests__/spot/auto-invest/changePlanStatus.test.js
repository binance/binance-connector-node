/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const planId = 12345
const status = 'ONGOING'

describe('#changePlanStatus', () => {
  it.each([
    [null, null],
    [null, status],
    [planId, null]
  ])('should throw MissingParameterError given missing params', (planId, status) => {
    expect(() => {
      SpotClient.changePlanStatus(planId, status)
    }).toThrow(MissingParameterError)
  })

  it('should change plan status', () => {
    const parameters = {
      recvWindow
    }
    nockPostMock(`/sapi/v1/lending/auto-invest/plan/edit-status?${buildQueryString({ planId, status, ...parameters })}`)(mockResponse)
    return SpotClient.changePlanStatus(planId, status, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
