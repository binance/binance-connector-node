/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  symbol
} = require('../../testUtils/mockData')

const type = 'MARGIN'
describe('#marginManualLiquidation', () => {
  it('throw MissingParameterError when missing type', () => {
    expect(() => {
      SpotClient.marginManualLiquidation(null)
    }).toThrow(MissingParameterError)
  })
  it('should margin manual liquidation', () => {
    const parameters = {
      symbol
    }
    nockPostMock(`/sapi/v1/margin/manual-liquidation?${buildQueryString({ type, ...parameters })}`)(mockResponse)
    return SpotClient.marginManualLiquidation(type, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
