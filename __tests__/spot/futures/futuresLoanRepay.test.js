/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const coin = 'USDT'
const collateralCoin = 'BUSD'
const amount = 2.5

describe('#futuresLoanRepay', () => {
  describe('throw MissingParameterError', () => {
    it('missing coin', () => {
      expect(() => {
        SpotClient.futuresLoanRepay('', collateralCoin, amount)
      }).toThrow(MissingParameterError)
    })
    it('missing collateralCoin', () => {
      expect(() => {
        SpotClient.futuresLoanRepay(coin, '', amount)
      }).toThrow(MissingParameterError)
    })
    it('missing amount', () => {
      expect(() => {
        SpotClient.futuresLoanRepay(coin, collateralCoin, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should repay for cross collateral', () => {
    const parameters = {
      coin,
      collateralCoin,
      amount
    }

    nockPostMock(`/sapi/v1/futures/loan/repay?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.futuresLoanRepay(coin, collateralCoin, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
