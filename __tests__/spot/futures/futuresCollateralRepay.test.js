/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, recvWindow } = require('../../testUtils/mockData')

describe('#futuresCollateralRepay', () => {
  it('missing quoteId', () => {
    expect(() => {
      SpotClient.futuresCollateralRepay()
    }).toThrow(MissingParameterError)
  })

  it('should repay with collateral', () => {
    const quoteId = '3eece81ca2734042b2f538ea0d9cbdd3'

    const parameters = {
      recvWindow
    }

    nockPostMock(`/sapi/v1/futures/loan/collateralRepay?${buildQueryString({ quoteId, ...parameters })}`)(mockResponse)

    return SpotClient.futuresCollateralRepay(quoteId, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
