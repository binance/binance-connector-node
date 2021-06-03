/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const coin = 'USDT'
const collateralCoin = 'BUSD'
const amount = 3

const { queryString } = require('../../testUtils/mockData')

describe('#futuresCollateralRepayQuote', () => {
  describe('throw MissingParameterError', () => {
    it('missing coin', () => {
      expect(() => {
        SpotClient.futuresCollateralRepayQuote('', collateralCoin, amount)
      }).toThrow(MissingParameterError)
    })
    it('missing collateralCoin', () => {
      expect(() => {
        SpotClient.futuresCollateralRepayQuote(coin, '', amount)
      }).toThrow(MissingParameterError)
    })
    it('missing amount', () => {
      expect(() => {
        SpotClient.futuresCollateralRepayQuote(coin, collateralCoin, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should get repay quote', () => {
    const parameters = {
      coin,
      collateralCoin,
      amount
    }

    nockMock(`/sapi/v1/futures/loan/collateralRepay?${queryString(parameters)}`)(responseMockData)

    return SpotClient.futuresCollateralRepayQuote(coin, collateralCoin, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
