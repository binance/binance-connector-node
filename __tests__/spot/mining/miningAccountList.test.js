/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const algo = 'sha256'
const userName = 'minerName'

describe('#miningAccountList', () => {
  describe('throw MissingParameterError', () => {
    it('missing algo', () => {
      expect(() => {
        SpotClient.miningAccountList('', userName)
      }).toThrow(MissingParameterError)
    })

    it('missing userName', () => {
      expect(() => {
        SpotClient.miningAccountList(algo, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return Account list', () => {
    const parameters = {
      algo,
      userName
    }
    nockMock(`/sapi/v1/mining/statistics/user/list?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.miningAccountList(algo, userName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
