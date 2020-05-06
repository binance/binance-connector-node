/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  asset,
  amount
} = require('../../testUtils/mockData')

const toEmail = 'alice@test.com'

describe('#managedSubAccountDeposit', () => {
  it.each(
    [['', asset, amount],
      [toEmail, '', amount],
      [toEmail, asset, '']
    ]
  )('should throw MissingParameterError when missing parameters', (pToEmail, pAsset, pAmount) => {
    expect(() => {
      SpotClient.managedSubAccountDeposit(pToEmail, pAsset, pAmount)
    }).toThrow(MissingParameterError)
  })

  it('should deposit asset to the managed sub account', () => {
    const parameters = {
      toEmail,
      asset,
      amount,
      recvWindow
    }
    nockPostMock(`/sapi/v1/managed-subaccount/deposit?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.managedSubAccountDeposit(toEmail, asset, amount, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
