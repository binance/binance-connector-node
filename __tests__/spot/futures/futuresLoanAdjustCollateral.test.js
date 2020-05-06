/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  loanCoin,
  collateralCoin
} = require('../../testUtils/mockData')

const amount = 2.5
const direction = 'ADDITIONAL'

describe('#futuresLoanAdjustCollateral', () => {
  describe('throw MissingParameterError', () => {
    it('missing loanCoin', () => {
      expect(() => {
        SpotClient.futuresLoanAdjustCollateral('', collateralCoin, amount, direction)
      }).toThrow(MissingParameterError)
    })
    it('missing collateralCoin', () => {
      expect(() => {
        SpotClient.futuresLoanAdjustCollateral(loanCoin, '', amount, direction)
      }).toThrow(MissingParameterError)
    })
    it('missing amount', () => {
      expect(() => {
        SpotClient.futuresLoanAdjustCollateral(loanCoin, collateralCoin, '', direction)
      }).toThrow(MissingParameterError)
    })
    it('missing direction', () => {
      expect(() => {
        SpotClient.futuresLoanAdjustCollateral(loanCoin, collateralCoin, amount, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should adjust cross collateral LTV', () => {
    const parameters = {
      loanCoin,
      collateralCoin,
      amount,
      direction
    }

    nockPostMock(`/sapi/v2/futures/loan/adjustCollateral?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.futuresLoanAdjustCollateral(loanCoin, collateralCoin, amount, direction).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
