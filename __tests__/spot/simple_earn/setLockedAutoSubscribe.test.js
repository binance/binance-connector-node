/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const positionId = '1'
const autoSubscribe = true

describe('#setLockedAutoSubscribe', () => {
  describe('throw MissingParameterError', () => {
    it('missing positionId', () => {
      expect(() => {
        SpotClient.setLockedAutoSubscribe('', autoSubscribe)
      }).toThrow(MissingParameterError)
    })

    it('missing autoSubscribe', () => {
      expect(() => {
        SpotClient.setLockedAutoSubscribe(positionId, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should suscribe locked product', () => {
    const parameters = {
      positionId,
      autoSubscribe
    }
    nockPostMock(`/sapi/v1/simple-earn/locked/setAutoSubscribe?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.setLockedAutoSubscribe(positionId, autoSubscribe).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
