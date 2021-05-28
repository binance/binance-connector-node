/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountEnableFutures', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', () => {
      expect(() => {
        SpotClient.subAccountEnableFutures('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should enable sub account futures', () => {
    const parameters = {
      email,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/futures/enable?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountEnableFutures(email, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
