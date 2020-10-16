/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  email,
  asset,
  amount
} = require('../../testUtils/mockData')

describe('#subAccountTransferToSub', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', async () => {
      expect(() => {
        SpotClient.subAccountTransferToSub('', asset, amount)
      }).toThrow(MissingParameterError)
    })

    it('missing asset', async () => {
      expect(() => {
        SpotClient.subAccountTransferToSub(email, '', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', async () => {
      expect(() => {
        SpotClient.subAccountTransferToSub(email, asset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should transfer to sub account', async () => {
    const parameters = {
      toEmail: email,
      asset,
      amount,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/transfer/subToSub${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountTransferToSub(email, asset, amount, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
