/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginLoanRecord', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', () => {
      expect(() => {
        SpotClient.marginLoanRecord('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return margin loan record', () => {
    const parameters = {
      txId: 10,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/loan?${queryString({ asset, ...parameters })}`)(responseMockData)

    return SpotClient.marginLoanRecord(asset, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
