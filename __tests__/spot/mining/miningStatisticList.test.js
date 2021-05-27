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

describe('#miningStatisticList', () => {
  describe('throw MissingParameterError', () => {
    it('missing algo', async () => {
      expect(() => {
        SpotClient.miningStatisticList('', userName)
      }).toThrow(MissingParameterError)
    })

    it('missing userName', async () => {
      expect(() => {
        SpotClient.miningStatisticList(algo, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return Statistic list', async () => {
    const parameters = {
      algo,
      userName
    }
    nockMock(`/sapi/v1/mining/statistics/user/status?${queryString(parameters)}`)(responseMockData)

    return SpotClient.miningStatisticList(algo, userName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
