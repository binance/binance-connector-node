/* global describe, it, expect, */
// const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const { validateParameter } = require('../../src/helpers/validation')
const { MissingParameterError } = require('../../src/error/missingParameterError')

describe('#validateParameter', () => {
  it('should throw error without parameter', async () => {
    expect(() => {
      validateParameter()
    }).toThrow(MissingParameterError)
  })

  it('should throw error for empty parameter', async () => {
    expect(() => {
      validateParameter('', '')
    }).toThrow(MissingParameterError)
  })

  it('should throw error for empty parameter', async () => {
    expect(() => {
      validateParameter('BTCUSDT', 'symbol')
    }).not.toThrow(MissingParameterError)
  })
})
