/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  email,
  coin
} = require('../../testUtils/mockData')

describe('#subAccountDepositAddress', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', () => {
      expect(() => {
        SpotClient.subAccountDepositAddress('', 'BNB')
      }).toThrow(MissingParameterError)
    })

    it('missing coin', () => {
      expect(() => {
        SpotClient.subAccountDepositAddress(email, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should query sub accont deposit address', () => {
    const parameters = {
      email,
      coin,
      recvWindow
    }

    nockMock(`/sapi/v1/capital/deposit/subAddress?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountDepositAddress(email, coin, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
