/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow
} = require('../../testUtils/mockData')

const quoteAsset = 'USDT'
const baseAsset = 'BUSD'
const quoteQty = 1

describe('#bswapRequestQuote', () => {
  describe('throw MissingParameterError', () => {
    it('missing quoteAsset', () => {
      expect(() => {
        SpotClient.bswapRequestQuote('', baseAsset, quoteQty)
      }).toThrow(MissingParameterError)
    })

    it('missing baseAsset', () => {
      expect(() => {
        SpotClient.bswapRequestQuote(quoteAsset, '', quoteQty)
      }).toThrow(MissingParameterError)
    })

    it('missing quoteQty', () => {
      expect(() => {
        SpotClient.bswapRequestQuote(quoteAsset, baseAsset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should request a quote', () => {
    const parameters = {
      quoteAsset,
      baseAsset,
      quoteQty,
      recvWindow
    }

    nockMock(`/sapi/v1/bswap/quote?${queryString({ ...parameters })}`)(responseMockData)
    return SpotClient.bswapRequestQuote(quoteAsset, baseAsset, quoteQty, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
