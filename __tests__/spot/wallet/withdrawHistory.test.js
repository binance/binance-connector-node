/* global describe, it, expect, */
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString
} = require('../../testUtils/mockData')

describe('#withdrawHistory', () => {
  it('should return coin information', () => {
    const parameters = {
      coin: 'BNB',
      status: 1
    }
    nockMock(`/sapi/v1/capital/withdraw/history?${queryString({ coin: 'BNB', status: 1 })}`)(responseMockData)

    return SpotClient.withdrawHistory(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
