/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  txId,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginLoanRecord', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', async () => {
      expect(() => {
        SpotClient.marginLoanRecord('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return margin loan record', async () => {
    const parameters = {
      txId,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/loan${queryString({ asset, ...parameters })}`)(responseMockData)

    return SpotClient.marginLoanRecord(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
