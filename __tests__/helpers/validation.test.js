/* global describe, it, expect, */

const { validateParameter } = require('../../src/helpers/validation')
const { MissingParameterError } = require('../../src/error/missingParameterError')

describe('#validateParameter', () => {
  it('should throw error without parameter', () => {
    expect(() => {
      validateParameter()
    }).toThrow(MissingParameterError)
  })

  it.each([
    ['', ''], ['', 'paramName'], ['', 'paramName'],
    [undefined, 'paramName'], [null, 'paramName'], [NaN, 'paramName']
  ])('should throw error for empty parameter', (param, paramName) => {
    expect(() => {
      validateParameter(param, paramName)
    }).toThrow(MissingParameterError)
  })

  it.each([
    ['BTCUSDT', 'symbol'], [false, 'enableBlvt'], [0, 'type']
  ])('should not throw error when parameter is filled', (param, paramName) => {
    expect(() => {
      validateParameter(param, paramName)
    }).not.toThrow(MissingParameterError)
  })
})
