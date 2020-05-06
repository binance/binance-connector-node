/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  loanCoin,
  collateralCoin
} = require('../../testUtils/mockData')

describe('#futuresLoanCalcMaxAdjustAmount', () => {
  describe('throw MissingParameterError', () => {
    it('missing loanCoin', () => {
      expect(() => {
        SpotClient.futuresLoanCalcMaxAdjustAmount('', collateralCoin)
      }).toThrow(MissingParameterError)
    })
    it('missing collateralCoin', () => {
      expect(() => {
        SpotClient.futuresLoanCalcMaxAdjustAmount(loanCoin, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should get max amount to adjust cross collateral LTV', () => {
    const parameters = {
      loanCoin,
      collateralCoin
    }

    nockMock(`/sapi/v2/futures/loan/calcMaxAdjustAmount?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.futuresLoanCalcMaxAdjustAmount(loanCoin, collateralCoin).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
