/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  asset,
  amount
} = require('../../testUtils/mockData')

describe('#subAccountTransferToMaster', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', () => {
      expect(() => {
        SpotClient.subAccountTransferToMaster('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', () => {
      expect(() => {
        SpotClient.subAccountTransferToMaster(asset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should transfer to master', () => {
    const parameters = {
      asset,
      amount,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/transfer/subToMaster?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountTransferToMaster(asset, amount, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
