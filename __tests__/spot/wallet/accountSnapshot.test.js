/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  queryString,
  limit,
  recvWindow
} = require('../../testUtils/mockData')

describe('#accountSnapshot', () => {
  describe('throw MissingParameterError', () => {
    it('missing type', () => {
      expect(() => {
        SpotClient.accountSnapshot('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return account snapshot', () => {
    const type = 'SPOT'
    const parameters = {
      limit,
      recvWindow
    }
    nockMock(`/sapi/v1/accountSnapshot?${queryString({ type, ...parameters })}`)(responseMockData)

    return SpotClient.accountSnapshot(type, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
