/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockDeleteMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#closeMarginListenKey', () => {
  it('missing listenKey', () => {
    expect(() => {
      SpotClient.closeMarginListenKey('')
    }).toThrow(MissingParameterError)
  })

  it('should result of delete listen key', () => {
    nockDeleteMock('/sapi/v1/userDataStream?listenKey=aaa')(mockResponse)

    return SpotClient.closeMarginListenKey('aaa').then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
