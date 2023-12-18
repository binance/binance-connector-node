/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const planType = 'SINGLE'

describe('#getListOfPlans', () => {
  it('throw MissingParameterError when missing planType', () => {
    expect(() => {
      SpotClient.getListOfPlans(null)
    }).toThrow(MissingParameterError)
  })
  it('should get list of plans', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/lending/auto-invest/plan/list?${buildQueryString({ planType, ...parameters })}`)(mockResponse)
    return SpotClient.getListOfPlans(planType, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
