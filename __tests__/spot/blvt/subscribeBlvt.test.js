/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  amount
} = require('../../testUtils/mockData')

const tokenName = 'BTCDOWN'

describe('#subscribeBlvt', () => {
  describe('throw MissingParameterError', () => {
    it('missing tokenName', async () => {
      expect(() => {
        SpotClient.subscribeBlvt('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing cost', async () => {
      expect(() => {
        SpotClient.subscribeBlvt(tokenName, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should subscribe blvt', async () => {
    const parameters = {
      tokenName,
      cost: amount
    }
    nockPostMock(`/sapi/v1/blvt/subscribe${queryString({ ...parameters })}`)(responseMockData)
    return SpotClient.subscribeBlvt(tokenName, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
