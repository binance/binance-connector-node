/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, recvWindow } = require('../../testUtils/mockData')

const quoteAsset = 'USDT'
const baseAsset = 'BUSD'
const quoteQty = 1

describe('#bswapRequestQuote', () => {
  describe('throw MissingParameterError', () => {
    it('missing quoteAsset', () => {
      expect(() => {
        SpotClient.bswapSwap('', baseAsset, quoteQty)
      }).toThrow(MissingParameterError)
    })

    it('missing baseAsset', () => {
      expect(() => {
        SpotClient.bswapSwap(quoteAsset, '', quoteQty)
      }).toThrow(MissingParameterError)
    })

    it('missing quoteQty', () => {
      expect(() => {
        SpotClient.bswapSwap(quoteAsset, baseAsset, '')
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

    nockPostMock(`/sapi/v1/bswap/swap?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.bswapSwap(quoteAsset, baseAsset, quoteQty, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
