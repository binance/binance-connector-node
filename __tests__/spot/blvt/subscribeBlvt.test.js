/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  amount
} = require('../../testUtils/mockData')

const tokenName = 'BTCDOWN'

describe('#subscribeBlvt', () => {
  describe('throw MissingParameterError', () => {
    it('missing tokenName', () => {
      expect(() => {
        SpotClient.subscribeBlvt('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing cost', () => {
      expect(() => {
        SpotClient.subscribeBlvt(tokenName, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should subscribe blvt', () => {
    const parameters = {
      tokenName,
      cost: amount
    }
    nockPostMock(`/sapi/v1/blvt/subscribe?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.subscribeBlvt(tokenName, amount).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
