/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  email
} = require('../../testUtils/mockData')

const futuresType = 2

describe('#subAccountFuturesAccountV2', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', () => {
      expect(() => {
        SpotClient.subAccountFuturesAccountV2('', futuresType)
      }).toThrow(MissingParameterError)
    })
  })

  describe('throw MissingParameterError', () => {
    it('missing futuresType', () => {
      expect(() => {
        SpotClient.subAccountFuturesAccountV2(email, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should get sub account futures acount details based on futuresType', () => {
    const parameters = {
      email,
      futuresType,
      recvWindow
    }

    nockMock(`/sapi/v2/sub-account/futures/account?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountFuturesAccountV2(email, futuresType, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
