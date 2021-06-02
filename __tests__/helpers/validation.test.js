/* global describe, it, expect, */

const { validateParameter, hasOneOfParameters } = require('../../src/helpers/validation')
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

describe('#hasOneOfParameters', () => {
  it('should throw error without parameters', async () => {
    expect(() => {
      hasOneOfParameters()
    }).toThrow(MissingParameterError)
  })

  it('should throw error for all empty parameters', async () => {
    expect(() => {
      hasOneOfParameters('', '', '', '')
    }).toThrow(MissingParameterError)
  })

  it('should throw error for empty parameter', async () => {
    expect(() => {
      hasOneOfParameters('USDT', '2', 'BUSD', '2.5')
    }).not.toThrow(MissingParameterError)
  })
})
