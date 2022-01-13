/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const futuresType = 2

describe('#subAccountFuturesAccountSummaryV2', () => {
  describe('throw MissingParameterError', () => {
    it('missing futuresType', () => {
      expect(() => {
        SpotClient.subAccountFuturesAccountSummaryV2('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should get sub account futures acount summary based on futuresType', () => {
    const parameters = {
      futuresType,
      recvWindow
    }

    nockMock(`/sapi/v2/sub-account/futures/accountSummary?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountFuturesAccountSummaryV2(futuresType, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
