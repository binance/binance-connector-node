/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPutMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const symbol = 'BNBUSDT'
const listenKey = 'aaa'

describe('#renewIsolatedMarginListenKey', () => {
  it.each(
    [[undefined, undefined], ['', listenKey], [symbol, '']]
  )('should throw MissingParameterError', (pSymbol, pListenKey) => {
    expect(() => {
      SpotClient.renewIsolatedMarginListenKey(pSymbol, pListenKey)
    }).toThrow(MissingParameterError)
  })

  it('should renew isolated margin listen key', () => {
    nockPutMock(`/sapi/v1/userDataStream/isolated?symbol=${symbol}&listenKey=${(listenKey)}`)(mockResponse)
    return SpotClient.renewIsolatedMarginListenKey(symbol, listenKey).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
