/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  txId,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginRepayRecord', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', async () => {
      expect(() => {
        SpotClient.marginRepayRecord('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return margin repay record', async () => {
    const parameters = {
      txId,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/repay${queryString({ asset, ...parameters })}`)(responseMockData)

    return SpotClient.marginRepayRecord(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
