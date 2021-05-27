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

describe('#subAccountMarginTransfer', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', async () => {
      expect(() => {
        SpotClient.subAccountMarginTransfer('', asset, amount, 1)
      }).toThrow(MissingParameterError)
    })

    it('missing asset', async () => {
      expect(() => {
        SpotClient.subAccountMarginTransfer(email, '', amount, 1)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', async () => {
      expect(() => {
        SpotClient.subAccountMarginTransfer(email, asset, '', 1)
      }).toThrow(MissingParameterError)
    })

    it('missing type', async () => {
      expect(() => {
        SpotClient.subAccountMarginTransfer(email, asset, amount, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should transfer sub account margin funds', async () => {
    const parameters = {
      email,
      asset,
      amount,
      type: 1,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/margin/transfer${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountMarginTransfer(email, asset, amount, 1, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
