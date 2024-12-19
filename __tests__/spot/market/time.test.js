/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, timeUnit } = require('../../testUtils/mockData')

describe('#time', () => {
  it('should return server time', () => {
    nockMock('/api/v3/time')(mockResponse)

    return SpotClient.time({ timeUnit }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return server time without optional parameters', () => {
    nockMock('/api/v3/time')(mockResponse)

    return SpotClient.time().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
