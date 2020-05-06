/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  email,
  coin
} = require('../../testUtils/mockData')

describe('#subAccountDepositHistory', () => {
  it('throw MissingParameterError when missing email', () => {
    expect(() => {
      SpotClient.subAccountDepositHistory('')
    }).toThrow(MissingParameterError)
  })

  it('should query sub accont deposit history', () => {
    const parameters = {
      email,
      coin,
      recvWindow
    }

    nockMock(`/sapi/v1/capital/deposit/subHisrec?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountDepositHistory(email, { coin, recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
