/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockDeleteMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#closeListenKey', () => {
  it('missing listenKey', () => {
    expect(() => {
      SpotClient.closeListenKey('')
    }).toThrow(MissingParameterError)
  })

  it('should result of delete listen key', () => {
    nockDeleteMock('/api/v3/userDataStream?listenKey=aaa')(mockResponse)

    return SpotClient.closeListenKey('aaa').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
