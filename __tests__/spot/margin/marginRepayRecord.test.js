/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginRepayRecord', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', () => {
      expect(() => {
        SpotClient.marginRepayRecord('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return margin repay record', () => {
    const parameters = {
      txId: 10,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/repay?${queryString({ asset, ...parameters })}`)(responseMockData)

    return SpotClient.marginRepayRecord(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
