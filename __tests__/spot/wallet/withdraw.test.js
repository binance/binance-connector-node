/* global describe, it, expect, */
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  queryString,
  amount
} = require('../../testUtils/mockData')

describe('#withdraw', () => {
  describe('throw MissingParameterError', () => {
    it('missing coin', async () => {
      expect(() => {
        SpotClient.withdraw('', 'address', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing address', async () => {
      expect(() => {
        SpotClient.withdraw('BNB', '', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', async () => {
      expect(() => {
        SpotClient.withdraw('BNB', 'address')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return withdraw data', async () => {
    const parameters = {
      network: 'BNB',
      addressTag: 'address_tag'
    }
    nockPostMock(`/sapi/v1/capital/withdraw/apply?${queryString({ coin: 'BNB', address: 'address', amount: 1, ...parameters })}`)(responseMockData)

    return SpotClient.withdraw('BNB', 'address', 1, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
