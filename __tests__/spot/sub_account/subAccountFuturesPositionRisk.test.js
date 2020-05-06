/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountFuturesPositionRisk', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', () => {
      expect(() => {
        SpotClient.subAccountFuturesPositionRisk('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should get sub account futures position risk', () => {
    const parameters = {
      email,
      recvWindow
    }

    nockMock(`/sapi/v1/sub-account/futures/positionRisk?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountFuturesPositionRisk(email, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
