/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#marginForceLiquidationRecord', () => {
  it('should return force liquidation record', () => {
    nockMock('/sapi/v1/margin/forceLiquidationRec')(responseMockData)

    return SpotClient.marginForceLiquidationRecord().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
