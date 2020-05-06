/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

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
    nockPostMock(`/sapi/v1/mining/hash-transfer/config/cancel?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.miningHashrateResaleCancel(configId, userName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
