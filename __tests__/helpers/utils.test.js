/* global describe, it, expect, */

const { cleanEmptyObject } = require('../../src/helpers/utils')

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
