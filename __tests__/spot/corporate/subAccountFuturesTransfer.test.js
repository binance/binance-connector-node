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

describe('#subAccountFuturesTransfer', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', async () => {
      expect(() => {
        SpotClient.subAccountFuturesTransfer('', asset, amount, 1)
      }).toThrow(MissingParameterError)
    })

    it('missing asset', async () => {
      expect(() => {
        SpotClient.subAccountFuturesTransfer(email, '', amount, 1)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', async () => {
      expect(() => {
        SpotClient.subAccountFuturesTransfer(email, asset, '', 1)
      }).toThrow(MissingParameterError)
    })

    it('missing type', async () => {
      expect(() => {
        SpotClient.subAccountFuturesTransfer(email, asset, amount, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should enable sub account futures', async () => {
    const parameters = {
      email,
      asset,
      amount,
      type: 1,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/futures/transfer${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountFuturesTransfer(email, asset, amount, 1, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
