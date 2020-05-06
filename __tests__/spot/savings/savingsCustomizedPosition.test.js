/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  projectId,
  status,
  recvWindow
} = require('../../testUtils/mockData')

describe('#savingsCustomizedPosition', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', () => {
      expect(() => {
        SpotClient.savingsCustomizedPosition('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return project position', () => {
    const parameters = {
      projectId,
      status,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/project/position/list?${buildQueryString({ asset: 'BNB', ...parameters })}`)(mockResponse)

    return SpotClient.savingsCustomizedPosition('BNB', parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
