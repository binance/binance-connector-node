/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockPostMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  productId,
  amount
} = require('../../testUtils/mockData')

describe('#savingsFlexibleRedeem', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', async () => {
      expect(() => {
        SpotClient.savingsFlexibleRedeem('', 1, 'FAST')
      }).toThrow(MissingParameterError)
    })

    it('missing amount', async () => {
      expect(() => {
        SpotClient.savingsFlexibleRedeem('BNB_SAVINGS', '', 'FAST')
      }).toThrow(MissingParameterError)
    })

    it('missing type', async () => {
      expect(() => {
        SpotClient.savingsFlexibleRedeem('BNB_SAVINGS', 1, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return success', async () => {
    const parameters = {
      productId,
      amount,
      type: 'FAST'
    }
    nockPostMock(`/sapi/v1/lending/daily/redeem?${queryString(parameters)}`)(responseMockData)

    return SpotClient.savingsFlexibleRedeem(productId, amount, 'FAST').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
