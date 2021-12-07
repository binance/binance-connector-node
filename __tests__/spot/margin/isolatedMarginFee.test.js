/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  symbol,
  recvWindow
} = require('../../testUtils/mockData')

describe('#isolatedMarginFee', () => {
  it('should get isolated margin fee data', () => {
    const parameters = {
      vipLevel: 1,
      symbol,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/isolatedMarginData?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.isolatedMarginFee(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
