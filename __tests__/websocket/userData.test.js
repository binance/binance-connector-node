/* global describe, it */
const { mockSubscription } = require('../testUtils/testSetup')
const { mockResponse } = require('../testUtils/mockData')

describe('#userData', () => {
  it('should get user data', () => {
    const listenKey = 'xSa9qUKlvgWqL4p1UxeDIkEn74s8IzEnasvtdrH7thyLjIeNdXmYHPfTRiar'
    mockSubscription(`/ws/${listenKey}`, mockResponse)
  })
})
