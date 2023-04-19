/* global describe, it */
const { mockSubscription } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#aggTrade', () => {
  it('should get aggregate trade data', () => {
    const symbol = 'BNBUSDT'
    mockSubscription(`/ws/${symbol.toLowerCase()}@aggTrade`, mockResponse)
  })
})
