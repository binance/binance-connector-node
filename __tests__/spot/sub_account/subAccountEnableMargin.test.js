/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountEnableMargin', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', () => {
      expect(() => {
        SpotClient.subAccountEnableMargin('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should enable sub account margin', () => {
    const parameters = {
      email,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/margin/enable?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountEnableMargin(email, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
