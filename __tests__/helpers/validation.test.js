/* global describe, it, expect, */

const { validateRequiredParameters } = require('../../src/helpers/validation')
const MissingParameterError = require('../../src/error/missingParameterError')

describe('#validateRequiredParameters', () => {
  it('should throw error without parameter', () => {
    expect(() => {
      validateRequiredParameters()
    }).toThrow(MissingParameterError)
  })

  it('should throw error with empty object', () => {
    expect(() => {
      validateRequiredParameters({})
    }).toThrow(MissingParameterError)
  })

  it.each([
    ['', ''], ['', 'paramName'], [{}, 'paramName'], [[], 'paramName'],
    [undefined, 'paramName'], [null, 'paramName'], [NaN, 'paramName']
  ])('should throw error for empty parameter', (param, paramName) => {
    expect(() => {
      validateRequiredParameters({ [paramName]: param })
    }).toThrow(MissingParameterError)
  })

  it.each([
    [{ paramName1: undefined, paramName2: 'value2' }, ['paramName1']],
    [{ paramName1: 1, paramName2: '' }, ['paramName2']],
    [{ paramName1: {}, paramName2: null, paramName3: NaN }, ['paramName1', 'paramName2', 'paramName3']]
  ])('should throw error when empty parameter exists', (paramObject, expectedParams) => {
    expect(() => {
      validateRequiredParameters(paramObject)
    }).toThrow(new MissingParameterError(expectedParams))
  })

  it.each([
    ['BTCUSDT', 'symbol'], [false, 'enableBlvt'], [0, 'type']
  ])('should not throw error when parameter is filled', (param, paramName) => {
    expect(() => {
      validateRequiredParameters({ [paramName]: param })
    }).not.toThrow(MissingParameterError)
  })
})
