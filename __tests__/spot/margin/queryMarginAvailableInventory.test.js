/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  symbol
} = require('../../testUtils/mockData')

const type = 'MARGIN'

describe('#queryMarginAvailableInventory', () => {
  it('throw MissingParameterError when missing type', () => {
    expect(() => {
      SpotClient.queryMarginAvailableInventory(null)
    }).toThrow(MissingParameterError)
  })
  it('should query margin available inventory', () => {
    const parameters = {
      symbol
    }
    nockMock(`/sapi/v1/margin/available-inventory?${buildQueryString({ type, ...parameters })}`)(mockResponse)
    return SpotClient.queryMarginAvailableInventory(type, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
