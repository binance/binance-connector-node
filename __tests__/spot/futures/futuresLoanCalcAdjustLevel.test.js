/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  loanCoin,
  collateralCoin
} = require('../../testUtils/mockData')

const amount = 2.5
const direction = 'ADDITIONAL'

describe('#futuresLoanCalcAdjustLevel', () => {
  describe('throw MissingParameterError', () => {
    it('missing loanCoin', () => {
      expect(() => {
        SpotClient.futuresLoanCalcAdjustLevel('', collateralCoin, amount, direction)
      }).toThrow(MissingParameterError)
    })
    it('missing collateralCoin', () => {
      expect(() => {
        SpotClient.futuresLoanCalcAdjustLevel(loanCoin, '', amount, direction)
      }).toThrow(MissingParameterError)
    })
    it('missing amount', () => {
      expect(() => {
        SpotClient.futuresLoanCalcAdjustLevel(loanCoin, collateralCoin, '', direction)
      }).toThrow(MissingParameterError)
    })
    it('missing direction', () => {
      expect(() => {
        SpotClient.futuresLoanCalcAdjustLevel(loanCoin, collateralCoin, amount, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should calculate rate after adjust cross collateral LTV', () => {
    const parameters = {
      loanCoin,
      collateralCoin,
      amount,
      direction
    }

    nockMock(`/sapi/v2/futures/loan/calcAdjustLevel?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.futuresLoanCalcAdjustLevel(loanCoin, collateralCoin, amount, direction).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
