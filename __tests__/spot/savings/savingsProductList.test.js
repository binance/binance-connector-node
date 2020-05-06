/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  asset,
  recvWindow
} = require('../../testUtils/mockData')

describe('#savingsProductList', () => {
  describe('throw MissingParameterError', () => {
    it('missing type', () => {
      expect(() => {
        SpotClient.savingsProductList('')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return product list', () => {
    const parameters = {
      asset,
      status: 'ALL',
      isSortAsc: true,
      sortBy: 'START_TIME',
      recvWindow
    }
    nockMock(`/sapi/v1/lending/project/list?${buildQueryString({ type: 'REGULAR', ...parameters })}`)(mockResponse)

    return SpotClient.savingsProductList('REGULAR', parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
