/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  email,
  asset,
  amount
} = require('../../testUtils/mockData')

const toEmail = 'bob@test.com'
const futuresType = 1

describe('#subAccountFuturesAssetTransfer', () => {
  describe('throw MissingParameterError', () => {
    it('missing fromEmail', async () => {
      expect(() => {
        SpotClient.subAccountFuturesAssetTransfer('', toEmail, futuresType, asset, amount)
      }).toThrow(MissingParameterError)
    })

    it('missing toEmail', async () => {
      expect(() => {
        SpotClient.subAccountFuturesAssetTransfer(email, '', futuresType, asset, amount)
      }).toThrow(MissingParameterError)
    })

    it('missing futuresType', async () => {
      expect(() => {
        SpotClient.subAccountFuturesAssetTransfer(email, toEmail, '', asset, amount)
      }).toThrow(MissingParameterError)
    })

    it('missing asset', async () => {
      expect(() => {
        SpotClient.subAccountFuturesAssetTransfer(email, toEmail, futuresType, '', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', async () => {
      expect(() => {
        SpotClient.subAccountFuturesAssetTransfer(email, toEmail, futuresType, asset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should transfer sub account futures asset', async () => {
    const parameters = {
      fromEmail: email,
      toEmail,
      futuresType,
      asset,
      amount,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/futures/internalTransfer${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountFuturesAssetTransfer(email, toEmail, futuresType, asset, amount, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
