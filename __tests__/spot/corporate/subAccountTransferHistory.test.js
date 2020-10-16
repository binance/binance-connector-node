/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountTransferHistory', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', async () => {
      expect(() => {
        SpotClient.subAccountTransferHistory('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return sub account transfer history', async () => {
    const parameters = {
      email,
      recvWindow
    }

    nockMock(`/wapi/v3/sub-account/transfer/history.html${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountTransferHistory(email, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
