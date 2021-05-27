/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  amount
} = require('../../testUtils/mockData')

describe('#marginBorrow', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', async () => {
      expect(() => {
        SpotClient.marginBorrow('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', async () => {
      expect(() => {
        SpotClient.marginBorrow(asset, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should transfer transaction id', async () => {
    const parameters = {
      asset,
      amount
    }
    nockPostMock(`/sapi/v1/margin/loan?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.marginBorrow(asset, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
