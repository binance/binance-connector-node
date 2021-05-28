/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  nockPostMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString
} = require('../../testUtils/mockData')

const configId = 1000
const userName = 'minerName'

describe('#miningHashrateResaleCancel', () => {
  describe('throw MissingParameterError', () => {
    it('missing configId', () => {
      expect(() => {
        SpotClient.miningHashrateResaleCancel('', userName)
      }).toThrow(MissingParameterError)
    })

    it('missing userName', () => {
      expect(() => {
        SpotClient.miningHashrateResaleCancel(configId, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should cancel hashrate resale configuration', () => {
    const parameters = {
      configId,
      userName
    }
    nockPostMock(`/sapi/v1/mining/hash-transfer/config/cancel?${queryString(parameters)}`)(responseMockData)

    return SpotClient.miningHashrateResaleCancel(configId, userName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
