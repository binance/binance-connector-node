/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const coin = 'USDT'
const collateralCoin = 'BUSD'

describe('#futuresCollateralRepayLimit', () => {
  describe('throw MissingParameterError', () => {
    it('missing coin', () => {
      expect(() => {
        SpotClient.futuresCollateralRepayLimit('', collateralCoin)
      }).toThrow(MissingParameterError)
    })
    it('missing collateralCoin', () => {
      expect(() => {
        SpotClient.futuresCollateralRepayLimit(coin, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('check the maximum and minimum limit when repay with collateral', () => {
    const parameters = {
      coin,
      collateralCoin
    }

    nockMock(`/sapi/v1/futures/loan/collateralRepayLimit?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.futuresCollateralRepayLimit(coin, collateralCoin).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
