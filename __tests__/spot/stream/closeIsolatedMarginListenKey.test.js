/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockDeleteMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const symbol = 'BNBUSDT'
const listenKey = 'aaa'

describe('#closeIsolatedMarginListenKey', () => {
  it.each(
    [[undefined, undefined], ['', listenKey], [symbol, '']]
  )('should throw MissingParameterError', (pSymbol, pListenKey) => {
    expect(() => {
      SpotClient.closeIsolatedMarginListenKey(pSymbol, pListenKey)
    }).toThrow(MissingParameterError)
  })

  it('should close isolated margin listen key', () => {
    nockDeleteMock(`/sapi/v1/userDataStream/isolated?symbol=${symbol}&listenKey=${(listenKey)}`)(mockResponse)
    return SpotClient.closeIsolatedMarginListenKey(symbol, listenKey).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
