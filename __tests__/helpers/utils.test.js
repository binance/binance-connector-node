/* global describe, it, expect, */

const { cleanEmptyObject, buildQueryString } = require('../../src/helpers/utils')

describe('#cleanEmptyObject', () => {
  it('should be same without empty value', async () => {
    const obj = { foo: 'bar' }
    expect(cleanEmptyObject(obj)).toBe(obj)
  })

  it('should remove the empty value', async () => {
    const empty = {}
    expect(cleanEmptyObject(empty)).toStrictEqual({})
    const emptyObj = { foo: '' }
    expect(cleanEmptyObject(emptyObj)).toStrictEqual({})
    const mixedObj = { foo: '', key: 'value' }
    expect(cleanEmptyObject(mixedObj)).toStrictEqual({ key: 'value' })
  })
})

describe('#buildQueryString', () => {
  it('should be return query string', async () => {
    const obj = { foo: 'bar' }
    expect(buildQueryString(obj)).toStrictEqual('?foo=bar')
  })

  it('should be return query string from multi keys', async () => {
    const obj = { foo: 'bar', key: 'value' }
    expect(buildQueryString(obj)).toStrictEqual('?foo=bar&key=value')
  })

  it('recieve empty object', async () => {
    const obj = {}
    expect(buildQueryString(obj)).toStrictEqual('?')
  })
})
