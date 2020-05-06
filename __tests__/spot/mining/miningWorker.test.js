/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const algo = 'sha256'
const userName = 'minerName'
const workerName = 'bhdc1.16A10404B'

describe('#miningWorker', () => {
  describe('throw MissingParameterError', () => {
    it('missing algo', () => {
      expect(() => {
        SpotClient.miningWorker('', userName, workerName)
      }).toThrow(MissingParameterError)
    })

    it('missing userName', () => {
      expect(() => {
        SpotClient.miningWorker(algo, '', workerName)
      }).toThrow(MissingParameterError)
    })

    it('missing workerName', () => {
      expect(() => {
        SpotClient.miningWorker(algo, userName, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return miner details', () => {
    const parameters = {
      algo,
      userName,
      workerName
    }
    nockMock(`/sapi/v1/mining/worker/detail?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.miningWorker(algo, userName, workerName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
