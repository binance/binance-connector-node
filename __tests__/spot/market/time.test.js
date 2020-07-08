/* global describe, it, expect, */

const Spot = require('../../../src/spot')
const { nockMock } = require('../../helpers/nockSetup')

describe('#time', () => {
  it('should return server time', async () => {
    nockMock('/api/v3/time')({ serverTime: 15100001 })

    const client = new Spot()
    return client.time().then(response => {
      expect(response).toBeDefined()
      expect(response.data.serverTime).toEqual(15100001)
    })
  })
})
