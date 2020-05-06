/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  amount,
  type
} = require('../../testUtils/mockData')

describe('#marginTransfer', () => {
  it('should transfer funds', () => {
    const parameters = {
      asset,
      amount,
      type
    }
    nockPostMock(`/sapi/v1/margin/transfer?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.marginTransfer(asset, amount, type).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
