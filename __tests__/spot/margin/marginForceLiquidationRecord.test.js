/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#marginForceLiquidationRecord', () => {
  it('should return force liquidation record', () => {
    nockMock('/sapi/v1/margin/forceLiquidationRec')(mockResponse)

    return SpotClient.marginForceLiquidationRecord().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
