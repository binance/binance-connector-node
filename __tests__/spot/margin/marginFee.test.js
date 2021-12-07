/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  coin,
  recvWindow
} = require('../../testUtils/mockData')

describe('#marginFee', () => {
  it('should get cross margin fee data', () => {
    const parameters = {
      vipLevel: 1,
      coin,
      recvWindow
    }
    nockMock(`/sapi/v1/margin/crossMarginData?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.marginFee(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
