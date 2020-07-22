/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  projectId,
  status,
  recvWindow
} = require('../../testUtils/mockData')

describe('#savingsCustomizedPosition', () => {
  describe('throw MissingParameterError', () => {
    it('missing asset', async () => {
      expect(() => {
        SpotClient.savingsCustomizedPosition('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return project position', async () => {
    const parameters = {
      projectId,
      status,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/project/position/list${queryString({ asset: 'BNB', ...parameters })}`)(responseMockData)

    return SpotClient.savingsCustomizedPosition('BNB', parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
