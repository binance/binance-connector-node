/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  amount
} = require('../../testUtils/mockData')

describe('#marginRepay', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', async () => {
      expect(() => {
        SpotClient.marginRepay('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', async () => {
      expect(() => {
        SpotClient.marginRepay(asset, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should transfer transaction id', async () => {
    const parameters = {
      asset,
      amount
    }
    nockPostMock(`/sapi/v1/margin/repay?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.marginRepay(asset, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
