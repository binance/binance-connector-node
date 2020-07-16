/* global describe, it, expect, */
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  amount,
  type
} = require('../../testUtils/mockData')

describe('#marginTransfer', () => {
  it('should transfer funds', async () => {
    const parameters = {
      asset,
      amount,
      type
    }
    nockPostMock(`/sapi/v1/margin/transfer${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.marginTransfer(asset, amount, type).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
