/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const type = 'REALTIME'

describe('#getFlexibleRewardsRecord', () => {
  describe('throw MissingParameterError', () => {
    it('missing productId', () => {
      expect(() => {
        SpotClient.getFlexibleRewardsRecord('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return flexible reward records', () => {
    const parameters = {
      type,
      productId: '1',
      asset: 'USDT'
    }
    nockMock(`/sapi/v1/simple-earn/flexible/history/rewardsRecord?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.getFlexibleRewardsRecord(type, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
