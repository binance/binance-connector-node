/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  current,
  size
} = require('../../testUtils/mockData')

describe('#marginInterestHistory', () => {
  it('should return margin interest history record', async () => {
    const parameters = {
      asset,
      current,
      size
    }
    nockMock(`/sapi/v1/margin/interestHistory${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.marginInterestHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
