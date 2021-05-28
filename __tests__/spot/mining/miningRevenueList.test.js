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

describe('#miningRevenueList', () => {
  describe('throw MissingParameterError', () => {
    it('missing algo', async () => {
      expect(() => {
        SpotClient.miningRevenueList('', userName)
      }).toThrow(MissingParameterError)
    })

    it('missing userName', async () => {
      expect(() => {
        SpotClient.miningRevenueList(algo, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return miner list', async () => {
    const parameters = {
      algo,
      userName
    }
    nockMock(`/sapi/v1/mining/payment/list?${queryString(parameters)}`)(responseMockData)

    return SpotClient.miningRevenueList(algo, userName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
