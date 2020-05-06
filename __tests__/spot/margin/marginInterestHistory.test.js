/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset
} = require('../../testUtils/mockData')

describe('#marginInterestHistory', () => {
  it('should return margin interest history record when no parameter attached', () => {
    nockMock('/sapi/v1/margin/interestHistory')(mockResponse)

    return SpotClient.marginInterestHistory().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
  it('should return margin interest history record', () => {
    const parameters = {
      current: 1,
      size: 10,
      asset
    }
    nockMock(`/sapi/v1/margin/interestHistory?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.marginInterestHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
