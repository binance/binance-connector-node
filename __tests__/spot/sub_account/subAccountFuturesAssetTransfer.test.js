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

const toEmail = 'bob@test.com'
const futuresType = 1

describe('#subAccountFuturesAssetTransfer', () => {
  describe('throw MissingParameterError', () => {
    it('missing fromEmail', () => {
      expect(() => {
        SpotClient.subAccountFuturesAssetTransfer('', toEmail, futuresType, asset, amount)
      }).toThrow(MissingParameterError)
    })

    it('missing toEmail', () => {
      expect(() => {
        SpotClient.subAccountFuturesAssetTransfer(email, '', futuresType, asset, amount)
      }).toThrow(MissingParameterError)
    })

    it('missing futuresType', () => {
      expect(() => {
        SpotClient.subAccountFuturesAssetTransfer(email, toEmail, '', asset, amount)
      }).toThrow(MissingParameterError)
    })

    it('missing asset', () => {
      expect(() => {
        SpotClient.subAccountFuturesAssetTransfer(email, toEmail, futuresType, '', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.subAccountFuturesAssetTransfer(email, toEmail, futuresType, asset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should transfer sub account futures asset', () => {
    const parameters = {
      fromEmail: email,
      toEmail,
      futuresType,
      asset,
      amount,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/futures/internalTransfer?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountFuturesAssetTransfer(email, toEmail, futuresType, asset, amount, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
