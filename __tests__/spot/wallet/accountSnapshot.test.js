/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  mockResponse,
  limit,
  recvWindow
} = require('../../testUtils/mockData')

describe('#accountSnapshot', () => {
  it('throw MissingParameterError when missing type', () => {
    expect(() => {
      SpotClient.accountSnapshot('')
    }).toThrow(MissingParameterError)
  })

  it('should return account snapshot', () => {
    const type = 'SPOT'
    const parameters = {
      limit,
      recvWindow
    }
    nockMock(`/sapi/v1/accountSnapshot?${buildQueryString({ type, ...parameters })}`)(mockResponse)

    return SpotClient.accountSnapshot(type, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
