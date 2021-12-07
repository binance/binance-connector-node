/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, recvWindow } = require('../../testUtils/mockData')

const startTime = 1636541539000
const endTime = 1638442339000

describe('#convertTradeHistory', () => {
  it.each`
  pStartTime | pEndTime
  ${''} | ${''}
  ${startTime} | ${''}
  ${''} | ${endTime}
  `('missing parameter', ({ pStartTime, pEndTime }) => {
    expect(() => {
      SpotClient.convertTradeHistory(pStartTime, pEndTime)
    }).toThrow(MissingParameterError)
  })

  it('should fetch trade history with optional param', () => {
    nockMock(`/sapi/v1/convert/tradeFlow?${buildQueryString({ startTime, endTime, recvWindow })}`)(mockResponse)

    return SpotClient.convertTradeHistory(startTime, endTime, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should fetch trade history', () => {
    nockMock(`/sapi/v1/convert/tradeFlow?${buildQueryString({ startTime, endTime })}`)(mockResponse)

    return SpotClient.convertTradeHistory(startTime, endTime).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
