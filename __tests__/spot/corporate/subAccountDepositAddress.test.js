/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  email,
  coin
} = require('../../testUtils/mockData')

describe('#subAccountDepositAddress', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', async () => {
      expect(() => {
        SpotClient.subAccountDepositAddress('', 'BNB')
      }).toThrow(MissingParameterError)
    })

    it('missing coin', async () => {
      expect(() => {
        SpotClient.subAccountDepositAddress(email, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should query sub accont deposit address', async () => {
    const parameters = {
      email,
      coin,
      recvWindow
    }

    nockMock(`/sapi/v1/capital/deposit/subAddress${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountDepositAddress(email, coin, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})