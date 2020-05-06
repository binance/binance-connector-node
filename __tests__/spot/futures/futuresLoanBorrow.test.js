/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const coin = 'USDT'
const amount = 2.5
const collateralCoin = 'BUSD'
const collateralAmount = 5

describe('#futuresLoanBorrow', () => {
  describe('throw MissingParameterError', () => {
    it('missing coin', () => {
      expect(() => {
        SpotClient.futuresLoanBorrow('', amount, collateralCoin, collateralAmount)
      }).toThrow(MissingParameterError)
    })
    it('missing collateralCoin', () => {
      expect(() => {
        SpotClient.futuresLoanBorrow(coin, amount, '', collateralAmount)
      }).toThrow(MissingParameterError)
    })
    it('missing amount or collateralAmount', () => {
      expect(() => {
        SpotClient.futuresLoanBorrow(coin, '', collateralCoin, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should borrow for cross collateral', () => {
    const parameters = {
      coin,
      amount,
      collateralCoin,
      collateralAmount
    }

    nockPostMock(`/sapi/v1/futures/loan/borrow?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.futuresLoanBorrow(coin, amount, collateralCoin, collateralAmount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
