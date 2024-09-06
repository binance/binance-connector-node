/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const projectId = '1'

describe('#getLockedPersonalLeftQuota', () => {
  describe('throw MissingParameterError', () => {
    it('missing projectId', () => {
      expect(() => {
        SpotClient.getLockedPersonalLeftQuota('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return locked personal left quota', () => {
    const parameters = {
      projectId
    }
    nockMock(`/sapi/v1/simple-earn/locked/personalLeftQuota?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.getLockedPersonalLeftQuota(projectId).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
