/* global describe, it */
const { mockSubscription } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#trade', () => {
  it('should get trade data', () => {
    const symbol = 'BNBUSDT'
    mockSubscription(`/ws/${symbol.toLowerCase()}@trade`, mockResponse)
  })
})
