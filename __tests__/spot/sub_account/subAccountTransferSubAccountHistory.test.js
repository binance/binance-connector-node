/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  asset
} = require('../../testUtils/mockData')

describe('#subAccountTransferSubAccountHistory', () => {
  it('should get sub account transfer history', async () => {
    const parameters = {
      asset,
      type: 1,
      recvWindow
    }

    nockMock(`/sapi/v1/sub-account/transfer/subUserHistory${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountTransferSubAccountHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
