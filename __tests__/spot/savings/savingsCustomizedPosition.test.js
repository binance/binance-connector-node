/* global describe, it, expect */
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  projectId,
  status,
  recvWindow
} = require('../../testUtils/mockData')

describe('#savingsCustomizedPosition', () => {
  it('should return all project position', () => {
    nockMock('/sapi/v1/lending/project/position/list')(mockResponse)

    return SpotClient.savingsCustomizedPosition().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should return project position', () => {
    const parameters = {
      projectId,
      status,
      recvWindow
    }
    nockMock(`/sapi/v1/lending/project/position/list?${buildQueryString({ asset: 'BNB', ...parameters })}`)(mockResponse)

    return SpotClient.savingsCustomizedPosition('BNB', parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
