/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const {
  mockResponse,
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
      email,
      futuresType,
      recvWindow
    }

    nockMock(`/sapi/v1/sub-account/futures/internalTransfer?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountFuturesAssetTransferHistory(email, futuresType, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
