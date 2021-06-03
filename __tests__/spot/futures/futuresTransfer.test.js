/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  amount
} = require('../../testUtils/mockData')

const type = 1 // transfer from spot account to USDT-Ⓜ futures account.

describe('#futuresTransfer', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', () => {
      expect(() => {
        SpotClient.futuresTransfer('', amount, type)
      }).toThrow(MissingParameterError)
    })
    it('missing amount', () => {
      expect(() => {
        SpotClient.futuresTransfer(asset, '', type)
      }).toThrow(MissingParameterError)
    })
    it('missing type', () => {
      expect(() => {
        SpotClient.futuresTransfer(asset, amount, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should execute transfer between spot account and futures account', () => {
    const parameters = {
      asset,
      amount,
      type
    }
    nockPostMock(`/sapi/v1/futures/transfer?${queryString(parameters)}`)(responseMockData)

    return SpotClient.futuresTransfer(asset, amount, type).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
