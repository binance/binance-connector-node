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

describe('#miningRevenueList', () => {
  describe('throw MissingParameterError', () => {
    it('missing algo', () => {
      expect(() => {
        SpotClient.miningRevenueList('', userName)
      }).toThrow(MissingParameterError)
    })

    it('missing userName', () => {
      expect(() => {
        SpotClient.miningRevenueList(algo, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return miner list', () => {
    const parameters = {
      algo,
      userName
    }
    nockMock(`/sapi/v1/mining/payment/list?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.miningRevenueList(algo, userName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
