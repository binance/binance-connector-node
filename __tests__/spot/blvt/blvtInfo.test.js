/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#blvtInfo', () => {
  it('should get blvt token info', () => {
    nockMock('/sapi/v1/blvt/tokenInfo')(responseMockData)
    return SpotClient.blvtInfo().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
