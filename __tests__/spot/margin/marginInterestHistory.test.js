/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset
} = require('../../testUtils/mockData')

describe('#marginInterestHistory', () => {
  it('should return margin interest history record', () => {
    const parameters = {
      current: 1,
      size: 10,
      asset
    }
    nockMock(`/sapi/v1/margin/interestHistory?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.marginInterestHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
