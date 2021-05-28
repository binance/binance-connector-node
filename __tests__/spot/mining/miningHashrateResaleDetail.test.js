/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString
} = require('../../testUtils/mockData')

const configId = 1000
const userName = 'minerName'

describe('#miningHashrateResaleDetail', () => {
  describe('throw MissingParameterError', () => {
    it('missing configId', () => {
      expect(() => {
        SpotClient.miningHashrateResaleDetail('', userName)
      }).toThrow(MissingParameterError)
    })

    it('missing userName', () => {
      expect(() => {
        SpotClient.miningHashrateResaleDetail(configId, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return hashrate resale detail', () => {
    const parameters = {
      configId,
      userName
    }
    nockMock(`/sapi/v1/mining/hash-transfer/profit/details?${queryString(parameters)}`)(responseMockData)

    return SpotClient.miningHashrateResaleDetail(configId, userName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
