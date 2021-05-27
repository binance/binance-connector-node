/* global describe, it, expect, */

const { removeEmptyValue, buildQueryString, flowRight } = require('../../src/helpers/utils')

describe('#removeEmptyValue', () => {
  it('should be same without empty value', () => {
    const obj = { foo: 'bar' }
    expect(removeEmptyValue(obj)).toBe(obj)
  })

  it.each(
    [
      [{ key1: 'value1', key2: '' }, { key1: 'value1' }],
      [{ key1: '', key2: 'value2' }, { key2: 'value2' }],
      [{ key1: 1, key2: undefined }, { key1: 1 }],
      [{ key1: true, key2: null, key3: false }, { key1: true, key3: false }]
    ]
  )('should remove the empty value', (obj, expectedObj) => {
    expect(removeEmptyValue(obj)).toStrictEqual(expectedObj)
  })

  it.each(
    [[undefined], [null], [NaN], [0.01], [1000], ['string'], [{ key: undefined }]]
  )('should remove invalid value %s and return an empty object', invalidValue => {
    expect(removeEmptyValue(invalidValue)).toStrictEqual({})
  })

  it('should keep falsy value 0 and false', () => {
    const obj = { key1: 0, key2: false, key3: true }
    expect(removeEmptyValue(obj)).toStrictEqual(obj)
  })
})

describe('#buildQueryString', () => {
  it.each`
  inputObj | output
  ${{ key1: 'value1' }} | ${'key1=value1'}
  ${{ key1: 'true', key2: 'false' }} | ${'key1=true&key2=false'}
  ${{ key1: 'value1', key2: 'value2', key3: 'value3' }} | ${'key1=value1&key2=value2&key3=value3'}
  ${{ key1: 'value1', key2: ['value2', 'value3'] }} | ${'key1=value1&key2=%5B%22value2%22%2C%22value3%22%5D'}
  `('should return a query string $output',
    ({ inputObj, output }) => {
      expect(buildQueryString(inputObj)).toStrictEqual(output)
    })

  it('should return an empty string when receives an empty object', () => {
    const obj = {}
    expect(buildQueryString(obj)).toStrictEqual('')
  })
})

describe('#flowRight', () => {
  it('should create a new composite function', () => {
    const incrementFunction = num => num + 1
    const squareFunction = num => num * num
    const expectedFunction = num => (num + 1) * (num + 1)
    expect(flowRight(squareFunction, incrementFunction)(2))
      .toStrictEqual(expectedFunction(2))
  })

  it('should be the same when there is only 1 input function', () => {
    const incrementFunction = num => num + 1
    const expectedFunction = num => num + 1
    expect(flowRight(incrementFunction)(2))
      .toStrictEqual(expectedFunction(2))
  })

  it('should create a new composite function given 3 inputs', () => {
    const incrementFunction = num => num + 1
    const squareFunction = num => num * num
    const subtractionFunction = num => num - 2
    const expectedFunction = num => ((num + 1) * (num + 1)) - 2
    expect(flowRight(subtractionFunction, squareFunction, incrementFunction)(2))
      .toStrictEqual(expectedFunction(2))
  })
})
