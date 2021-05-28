/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountFuturesPositionRisk', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', async () => {
      expect(() => {
        SpotClient.subAccountFuturesPositionRisk('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should get sub account futures position risk', async () => {
    const parameters = {
      email,
      recvWindow
    }

    nockMock(`/sapi/v1/sub-account/futures/positionRisk?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountFuturesPositionRisk(email, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
