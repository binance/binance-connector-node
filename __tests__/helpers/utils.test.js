/* global describe, it, expect, */

const { removeEmptyValue, buildQueryString } = require('../../src/helpers/utils')

describe('#removeEmptyValue', () => {
  it('should be same without empty value', () => {
    const obj = { foo: 'bar' }
    expect(removeEmptyValue(obj)).toBe(obj)
  })

  it('should remove the empty value', () => {
    const empty = {}
    expect(removeEmptyValue(empty)).toStrictEqual({})
    const emptyObj = { foo: '' }
    expect(removeEmptyValue(emptyObj)).toStrictEqual({})
    const mixedObj = { foo: '', key: 'value' }
    expect(removeEmptyValue(mixedObj)).toStrictEqual({ key: 'value' })
  })

  it.each(
    [[undefined], [null], [NaN], [0.01], [1000], ['string']]
  )('should remove invalid value %s', invalidValue => {
    expect(removeEmptyValue(invalidValue)).toStrictEqual({})
  })

  it('should keep falsy value 0 and false', async () => {
    const obj = { key1: 0, key2: false, key3: true }
    expect(removeEmptyValue(obj)).toStrictEqual(obj)
  })
})

describe('#buildQueryString', () => {
  it('should be return query string', async () => {
    const obj = { foo: 'bar' }
    expect(buildQueryString(obj)).toStrictEqual('foo=bar')
  })

  it('should be return query string from multi keys', async () => {
    const obj = { foo: 'bar', key: 'value' }
    expect(buildQueryString(obj)).toStrictEqual('foo=bar&key=value')
  })

  it('recieve empty object', async () => {
    const obj = {}
    expect(buildQueryString(obj)).toStrictEqual('')
  })
})
