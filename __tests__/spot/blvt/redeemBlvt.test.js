/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  amount
} = require('../../testUtils/mockData')

const tokenName = 'BTCDOWN'

describe('#redeemBlvt', () => {
  it.each(
    [[undefined, undefined], [tokenName, ''], [null, amount]]
  )('should throw MissingParameterError when missing parameters', (pTokenName, pAmount) => {
    expect(() => {
      SpotClient.redeemBlvt(pTokenName, pAmount)
    }).toThrow(MissingParameterError)
  })

  it('should redeem blvt', () => {
    const parameters = {
      tokenName,
      amount
    }
    nockPostMock(`/sapi/v1/blvt/redeem?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.redeemBlvt(tokenName, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
