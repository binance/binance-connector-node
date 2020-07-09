/* global describe, it, expect, */

const { nockMock, SpotClient } = require('../../helpers/testSetup')

describe('#ping', () => {
  it('should test API response', async () => {
    nockMock('/api/v3/ping')({})

    return SpotClient.ping().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual({})
    })
  })
})
