/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, recvWindow } = require('../../testUtils/mockData')

describe('#futuresCollateralRepayResult', () => {
  it('missing quoteId', () => {
    expect(() => {
      SpotClient.futuresCollateralRepayResult()
    }).toThrow(MissingParameterError)
  })

  it('should get repay with collateral result', () => {
    const quoteId = '3eece81ca2734042b2f538ea0d9cbdd3'
    const parameters = {
      recvWindow
    }

    nockMock(`/sapi/v1/futures/loan/collateralRepayResult?${buildQueryString({ quoteId, ...parameters })}`)(mockResponse)

    return SpotClient.futuresCollateralRepayResult(quoteId, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
