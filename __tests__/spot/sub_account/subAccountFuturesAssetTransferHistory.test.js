/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  email
} = require('../../testUtils/mockData')

const futuresType = 1

describe('#subAccountFuturesAssetTransferHistory', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', () => {
      expect(() => {
        SpotClient.subAccountFuturesAssetTransferHistory('', futuresType)
      }).toThrow(MissingParameterError)
    })

    it('missing futuresType', () => {
      expect(() => {
        SpotClient.subAccountFuturesAssetTransferHistory(email, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should get sub account futures asset transfer history', () => {
    const parameters = {
      email: email,
      futuresType,
      recvWindow
    }

    nockMock(`/sapi/v1/sub-account/futures/internalTransfer?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountFuturesAssetTransferHistory(email, futuresType, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
