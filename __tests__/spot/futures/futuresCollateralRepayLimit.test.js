/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const coin = 'USDT'
const collateralCoin = 'BUSD'

const { queryString } = require('../../testUtils/mockData')

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

    nockMock(`/sapi/v1/futures/loan/collateralRepayLimit?${queryString(parameters)}`)(responseMockData)

    return SpotClient.futuresCollateralRepayLimit(coin, collateralCoin).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
