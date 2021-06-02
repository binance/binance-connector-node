/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  email,
  coin
} = require('../../testUtils/mockData')

describe('#subAccountDepositHistory', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', () => {
      expect(() => {
        SpotClient.subAccountDepositHistory('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should query sub accont deposit history', () => {
    const parameters = {
      email,
      coin,
      recvWindow
    }

    nockMock(`/sapi/v1/capital/deposit/subHisrec?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountDepositHistory(email, { coin, recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
