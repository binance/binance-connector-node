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

describe('#subAccountFuturesTransfer', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', () => {
      expect(() => {
        SpotClient.subAccountFuturesTransfer('', asset, amount, 1)
      }).toThrow(MissingParameterError)
    })

    it('missing asset', () => {
      expect(() => {
        SpotClient.subAccountFuturesTransfer(email, '', amount, 1)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.subAccountFuturesTransfer(email, asset, '', 1)
      }).toThrow(MissingParameterError)
    })

    it('missing type', () => {
      expect(() => {
        SpotClient.subAccountFuturesTransfer(email, asset, amount, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should enable sub account futures', () => {
    const parameters = {
      email,
      asset,
      amount,
      type: 1,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/futures/transfer?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountFuturesTransfer(email, asset, amount, 1, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
