/* global describe, it, expect, jest */
const Spot = require('../../src/spot')
const { SpotClient } = require('../testUtils/testSetup')

describe('#subscribe/ unsubscribe', () => {
  it('should fetch the previous subscription and unsubscribe', () => {
    const MockSpotClient = new Spot()

    MockSpotClient.subscribe = new Proxy(MockSpotClient.subscribe, {
      apply: function (target, thisArg, [url, callback]) {
        const ws = {
          close: (code, reason) => {
            // close event code
            if (code === 1000) {
              callback(null, 'close')
            } else {
              callback(new Error('wrong close event code'), null)
            }
          }
        }
        thisArg.ws.push(ws)
      }
    })
    MockSpotClient.subscribe('url', (err, data) => {
      expect(err).toBeNull()
      expect(data).toEqual('close')
    })
    MockSpotClient.unsubscribe()
  })

  it('should not unsubscribe when no subscription', () => {
    SpotClient.logger.warn = jest.fn()
    SpotClient.unsubscribe()
    expect(SpotClient.logger.warn).toHaveBeenCalledTimes(1)
  })
})
