/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountStatus', () => {
  it('should return sub account status', async () => {
    const parameters = {
      email,
      recvWindow
    }
    nockMock(`/sapi/v1/sub-account/status?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountStatus(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
