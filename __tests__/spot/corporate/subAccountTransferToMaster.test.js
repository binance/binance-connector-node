/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  asset,
  amount
} = require('../../testUtils/mockData')

describe('#subAccountTransferToMaster', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', async () => {
      expect(() => {
        SpotClient.subAccountTransferToMaster('', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', async () => {
      expect(() => {
        SpotClient.subAccountTransferToMaster(asset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should transfer to master', async () => {
    const parameters = {
      asset,
      amount,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/transfer/subToMaster${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountTransferToMaster(asset, amount, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
