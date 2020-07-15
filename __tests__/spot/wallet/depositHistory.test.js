/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString
} = require('../../testUtils/mockData')

describe('#depositHistory', () => {
  it('should return coin information', async () => {
    const parameters = {
      coin: 'BNB',
      status: 1
    }
    nockMock(`/sapi/v1/capital/deposit/hisrec${queryString({ coin: 'BNB', status: 1 })}`)(responseMockData)

    return SpotClient.depositHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
