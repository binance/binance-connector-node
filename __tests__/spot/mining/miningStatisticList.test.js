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

describe('#miningStatisticList', () => {
  describe('throw MissingParameterError', () => {
    it('missing algo', () => {
      expect(() => {
        SpotClient.miningStatisticList('', userName)
      }).toThrow(MissingParameterError)
    })

    it('missing userName', () => {
      expect(() => {
        SpotClient.miningStatisticList(algo, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return Statistic list', () => {
    const parameters = {
      algo,
      userName
    }
    nockMock(`/sapi/v1/mining/statistics/user/status?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.miningStatisticList(algo, userName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
