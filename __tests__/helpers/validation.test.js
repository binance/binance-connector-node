/* global describe, it, expect */
const { validateRequiredParameters, hasOneOfParameters } = require('../../src/helpers/validation')
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

describe('#hasOneOfParameters', () => {
  it('should throw error without object', () => {
    expect(() => {
      hasOneOfParameters()
    }).toThrow(MissingParameterError)
  })

  it('should throw error with empty object', () => {
    expect(() => {
      hasOneOfParameters({})
    }).toThrow(MissingParameterError)
  })

  it.each([
    ['', ''], [{}, {}], [[], []], [undefined, undefined], [null, null]
  ])('should throw error when both parameters are empty ', (param, param2) => {
    expect(() => {
      hasOneOfParameters({ param, param2 })
    }).toThrow(MissingParameterError)
  })

  it.each([
    [2.0, 5.0], ['param', 'param2'],
    [2.0, ''], [2.0, {}], [2.0, []], [2.0, undefined], [2.0, null],
    ['', 5.0], [{}, 5.0], [[], 5.0], [undefined, 5.0], [null, 5.0]
  ])('should not throw error when at least one parameter is filled', (param, param2) => {
    expect(() => {
      hasOneOfParameters({ param, param2 })
    }).not.toThrow(MissingParameterError)
  })
})
