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

const fromEmail = email
const toEmail = 'bob@test.com'

describe('#subAccountTransfer', () => {
  describe('throw MissingParameterError', () => {
    it('missing fromEmail', async () => {
      expect(() => {
        SpotClient.subAccountTransfer('', toEmail, asset, amount)
      }).toThrow(MissingParameterError)
    })

    it('missing toEmail', async () => {
      expect(() => {
        SpotClient.subAccountTransfer(email, '', asset, amount)
      }).toThrow(MissingParameterError)
    })

    it('missing asset', async () => {
      expect(() => {
        SpotClient.subAccountTransfer(email, toEmail, '', amount)
      }).toThrow(MissingParameterError)
    })

    it('missing amount', async () => {
      expect(() => {
        SpotClient.subAccountTransfer(email, toEmail, asset, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should transfer asset', async () => {
    const parameters = {
      fromEmail,
      toEmail,
      asset,
      amount,
      recvWindow
    }

    nockPostMock(`/wapi/v3/sub-account/transfer.html${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountTransfer(fromEmail, toEmail, asset, amount, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
