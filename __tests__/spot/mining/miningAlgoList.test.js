/* global describe, it, expect, */
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

describe('#miningAlgoList', () => {
  it('should return algorithm list', async () => {
    nockMock('/sapi/v1/mining/pub/algoList')(responseMockData)

    return SpotClient.miningAlgoList().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
