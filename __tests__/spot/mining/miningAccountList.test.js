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

describe('#miningAccountList', () => {
  describe('throw MissingParameterError', () => {
    it('missing algo', async () => {
      expect(() => {
        SpotClient.miningAccountList('', userName)
      }).toThrow(MissingParameterError)
    })

    it('missing userName', async () => {
      expect(() => {
        SpotClient.miningAccountList(algo, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return Account list', async () => {
    const parameters = {
      algo,
      userName
    }
    nockMock(`/sapi/v1/mining/statistics/user/list?${queryString(parameters)}`)(responseMockData)

    return SpotClient.miningAccountList(algo, userName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
