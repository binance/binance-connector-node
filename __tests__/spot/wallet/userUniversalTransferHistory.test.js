/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  queryString,
  recvWindow
} = require('../../testUtils/mockData')

describe('#userUniversalTransferHistory', () => {
  describe('throw MissingParameterError', () => {
    it('missing type', () => {
      expect(() => {
        SpotClient.userUniversalTransferHistory('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return type deposit address', () => {
    const type = 'MARGIN_MAIN'
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/asset/transfer?${queryString({ type, ...parameters })}`)(responseMockData)

    return SpotClient.userUniversalTransferHistory(type, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
