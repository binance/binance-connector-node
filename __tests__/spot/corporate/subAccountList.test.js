/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  status
} = require('../../testUtils/mockData')

describe('#subAccountList', () => {
  it('should return sub account list', async () => {
    const parameters = {
      status,
      recvWindow
    }
    nockMock(`/wapi/v3/sub-account/list.html${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountList(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
