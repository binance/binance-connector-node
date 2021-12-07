/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  amount
} = require('../../testUtils/mockData')

describe('#withdraw', () => {
  describe('throw MissingParameterError', () => {
    it('missing coin', () => {
      expect(() => {
        SpotClient.withdraw('', 'address', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing address', () => {
      expect(() => {
        SpotClient.withdraw('BNB', '', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.withdraw('BNB', 'address')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return withdraw data', () => {
    const parameters = {
      network: 'BNB',
      addressTag: 'address_tag',
      walletType: 0
    }
    nockPostMock(`/sapi/v1/capital/withdraw/apply?${buildQueryString({ coin: 'BNB', address: 'address', amount: 1, ...parameters })}`)(mockResponse)

    return SpotClient.withdraw('BNB', 'address', 1, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
