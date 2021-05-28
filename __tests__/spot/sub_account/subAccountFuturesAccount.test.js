/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountFuturesAccount', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', () => {
      expect(() => {
        SpotClient.subAccountFuturesAccount('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should enable sub account futures', () => {
    const parameters = {
      email,
      recvWindow
    }

    nockMock(`/sapi/v1/sub-account/futures/account?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountFuturesAccount(email, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
