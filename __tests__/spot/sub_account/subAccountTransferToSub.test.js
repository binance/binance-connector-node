/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  email,
  asset,
  amount
} = require('../../testUtils/mockData')

describe('#subAccountTransferToSub', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', () => {
      expect(() => {
        SpotClient.subAccountTransferToSub('', asset, amount)
      }).toThrow(MissingParameterError)
    })

    it('missing asset', () => {
      expect(() => {
        SpotClient.subAccountTransferToSub(email, '', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.subAccountTransferToSub(email, asset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should transfer to sub account', () => {
    const parameters = {
      toEmail: email,
      asset,
      amount,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/transfer/subToSub?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountTransferToSub(email, asset, amount, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
