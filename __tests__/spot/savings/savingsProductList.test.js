/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#savingsProductList', () => {
  describe('throw MissingParameterError', () => {
    it('missing type', async () => {
      expect(() => {
        SpotClient.savingsProductList('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return product list', async () => {
    const parameters = {
      asset,
      status: 'ALL',
      isSortAsc: true,
      sortBy: 'START_TIME',
      recvWindow
    }
    nockMock(`/sapi/v1/lending/project/list?${queryString({ type: 'REGULAR', ...parameters })}`)(responseMockData)

    return SpotClient.savingsProductList('REGULAR', parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
