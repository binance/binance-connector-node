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

const algo = 'sha256'
const userName = 'minerName'

describe('#miningWorkerList', () => {
  describe('throw MissingParameterError', () => {
    it('missing algo', () => {
      expect(() => {
        SpotClient.miningWorkerList('', userName)
      }).toThrow(MissingParameterError)
    })

    it('missing userName', () => {
      expect(() => {
        SpotClient.miningWorkerList(algo, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return miner list', () => {
    const parameters = {
      algo,
      userName
    }
    nockMock(`/sapi/v1/mining/worker/list?${queryString(parameters)}`)(responseMockData)

    return SpotClient.miningWorkerList(algo, userName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
