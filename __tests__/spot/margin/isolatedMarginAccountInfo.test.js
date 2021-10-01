/* global describe, it, expect */
const { nockMock, SpotClient, buildQueryString } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#isolatedMarginAccountInfo', () => {
  it('should get isolated margin account information', () => {
    nockMock('/sapi/v1/margin/isolated/account')(mockResponse)

    return SpotClient.isolatedMarginAccountInfo().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should get isolated margin account information', () => {
    const symbols = 'BTCUSDT,BNBUSDT,ADAUSDT'
    nockMock(`/sapi/v1/margin/isolated/account?${buildQueryString({ symbols })}`)(mockResponse)

    return SpotClient.isolatedMarginAccountInfo({ symbols }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
}
)
