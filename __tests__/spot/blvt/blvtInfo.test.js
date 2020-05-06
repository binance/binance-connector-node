/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#blvtInfo', () => {
  it('should get blvt token info', () => {
    nockMock('/sapi/v1/blvt/tokenInfo')(mockResponse)
    return SpotClient.blvtInfo().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
