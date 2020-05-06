/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  asset,
  amount
} = require('../../testUtils/mockData')

const fromEmail = 'alice@test.com'

describe('#managedSubAccountWithdraw', () => {
  it.each(
    [['', asset, amount],
      [fromEmail, '', amount],
      [fromEmail, asset, '']
    ]
  )('should throw MissingParameterError when missing parameters', (pfromEmail, pAsset, pAmount) => {
    expect(() => {
      SpotClient.managedSubAccountWithdraw(pfromEmail, pAsset, pAmount)
    }).toThrow(MissingParameterError)
  })

  it('should withdraw asset from the managed sub account', () => {
    const parameters = {
      fromEmail,
      asset,
      amount,
      recvWindow
    }
    nockPostMock(`/sapi/v1/managed-subaccount/withdraw?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.managedSubAccountWithdraw(fromEmail, asset, amount, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
