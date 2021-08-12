/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, recvWindow } = require('../../testUtils/mockData')

describe('#c2cTradeHistory', () => {
  it('missing tradeType', () => {
    expect(() => {
      SpotClient.c2cTradeHistory()
    }).toThrow(MissingParameterError)
  })

  it('should fetch trade history', () => {
    const tradeType = 'BUY'
    nockMock(`/sapi/v1/c2c/orderMatch/listUserOrderHistory?${buildQueryString({ tradeType, recvWindow })}`)(mockResponse)

    return SpotClient.c2cTradeHistory(tradeType, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should fetch trade history without option', () => {
    const tradeType = 0
    nockMock(`/sapi/v1/c2c/orderMatch/listUserOrderHistory?${buildQueryString({ tradeType })}`)(mockResponse)

    return SpotClient.c2cTradeHistory(tradeType).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
