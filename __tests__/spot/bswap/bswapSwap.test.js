/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow
} = require('../../testUtils/mockData')

const quoteAsset = 'USDT'
const baseAsset = 'BUSD'
const quoteQty = 1

describe('#bswapRequestQuote', () => {
  describe('throw MissingParameterError', () => {
    it('missing quoteAsset', async () => {
      expect(() => {
        SpotClient.bswapSwap('', baseAsset, quoteQty)
      }).toThrow(MissingParameterError)
    })

    it('missing baseAsset', async () => {
      expect(() => {
        SpotClient.bswapSwap(quoteAsset, '', quoteQty)
      }).toThrow(MissingParameterError)
    })

    it('missing quoteQty', async () => {
      expect(() => {
        SpotClient.bswapSwap(quoteAsset, baseAsset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should request a quote', async () => {
    const parameters = {
      quoteAsset,
      baseAsset,
      quoteQty,
      recvWindow
    }

    nockPostMock(`/sapi/v1/bswap/swap${queryString({ ...parameters })}`)(responseMockData)
    return SpotClient.bswapSwap(quoteAsset, baseAsset, quoteQty, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
