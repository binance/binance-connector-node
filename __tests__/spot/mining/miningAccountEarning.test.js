/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, recvWindow } = require('../../testUtils/mockData')

const algo = 'sha256'

describe('#miningAccountEarning', () => {
  describe('throw MissingParameterError', () => {
    it('missing algo', () => {
      expect(() => {
        SpotClient.miningAccountEarning('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return account earnings', () => {
    const parameters = {
      algo,
      recvWindow
    }
    nockMock(`/sapi/v1/mining/payment/uid?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.miningAccountEarning(algo, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
