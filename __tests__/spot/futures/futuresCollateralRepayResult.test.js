/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow
} = require('../../testUtils/mockData')

describe('#futuresCollateralRepayResult', () => {
  describe('throw MissingParameterError', () => {
    it('missing quoteId', () => {
      expect(() => {
        SpotClient.futuresCollateralRepayResult()
      }).toThrow(MissingParameterError)
    })
  })

  it('should get repay with collateral result', () => {
    const quoteId = '3eece81ca2734042b2f538ea0d9cbdd3'
    const parameters = {
      recvWindow
    }

    nockMock(`/sapi/v1/futures/loan/collateralRepayResult?${queryString({ quoteId, ...parameters })}`)(responseMockData)

    return SpotClient.futuresCollateralRepayResult(quoteId, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
