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

describe('#miningBonusList', () => {
  describe('throw MissingParameterError', () => {
    it('missing algo', () => {
      expect(() => {
        SpotClient.miningBonusList('', userName)
      }).toThrow(MissingParameterError)
    })

    it('missing userName', () => {
      expect(() => {
        SpotClient.miningBonusList(algo, '')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return bonus list', () => {
    const parameters = {
      algo,
      userName
    }
    nockMock(`/sapi/v1/mining/payment/other${queryString(parameters)}`)(responseMockData)

    return SpotClient.miningBonusList(algo, userName).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
