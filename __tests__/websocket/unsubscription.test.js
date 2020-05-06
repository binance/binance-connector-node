/* global describe, it, expect, jest */
const Spot = require('../../src/spot')
const { SpotClient } = require('../testUtils/testSetup')

describe('#unsubscribe', () => {
  it('should fetch the previous subscription and unsubscribe', () => {
    const MockSpotClient = new Spot()

    MockSpotClient.subscribe = new Proxy(MockSpotClient.subscribe, {
      apply: function (target, thisArg, [url, callback]) {
        const ws = {
          close: (code, reason) => {
            // close event code
            if (thisArg.closeInitiated) {
              callback(null, 'close')
            } else {
              callback(new Error('wrong close event code'), null)
            }
          }
        }
        return { ws }
      }
    })
    const wsRef = MockSpotClient.subscribe('url', (err, data) => {
      expect(err).toBeNull()
      expect(data).toEqual('close')
    })
    MockSpotClient.unsubscribe(wsRef)
  })

  it.each(
    [[undefined], [{}], [{ otherKey: 'otherValue' }], [{ ws: undefined }]]
  )('should not unsubscribe when no subscription', (ref) => {
    SpotClient.logger.warn = jest.fn()
    SpotClient.unsubscribe(ref)
    expect(SpotClient.logger.warn).toHaveBeenCalledTimes(1)
  })
})
