/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  email
} = require('../../testUtils/mockData')

const futuresType = 2

describe('#subAccountFuturesPositionRiskV2', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', () => {
      expect(() => {
        SpotClient.subAccountFuturesPositionRiskV2('', futuresType)
      }).toThrow(MissingParameterError)
    })
  })

  describe('throw MissingParameterError', () => {
    it('missing futuresType', () => {
      expect(() => {
        SpotClient.subAccountFuturesPositionRiskV2(email, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should get sub account futures position risk based on futuresType', () => {
    const parameters = {
      email,
      futuresType,
      recvWindow
    }

    nockMock(`/sapi/v2/sub-account/futures/positionRisk?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountFuturesPositionRiskV2(email, futuresType, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
