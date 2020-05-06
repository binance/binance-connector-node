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
    nockMock(`/sapi/v1/mining/worker/list?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.miningWorkerList(algo, userName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
