/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse, recvWindow } = require('../../testUtils/mockData')

describe('# bnbConvertibleAssets', () => {
  it('should return bnb convertible assets', () => {
    const parameters = { recvWindow }

    nockPostMock(`/sapi/v1/asset/dust-btc?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.bnbConvertibleAssets(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
