/* global describe, it, expect */
const { nockMock, SpotClient } = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

describe('#dustLog', () => {
  it('should return account dust log', () => {
    nockMock('/sapi/v1/asset/dribblet')(mockResponse)

    return SpotClient.dustLog().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
