/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockDeleteMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  symbol,
  recvWindow
} = require('../../testUtils/mockData')

describe('#cancelOCOOrder', () => {
  describe('throw MissingParameterError', () => {
    it('missing symbol', async () => {
      expect(() => {
        SpotClient.cancelOCOOrder('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should return cancelled oco order', async () => {
    const parameters = {
      orderListId: 'list_id',
      recvWindow
    }
    nockDeleteMock(`/api/v3/orderList${queryString({ symbol, ...parameters })}`)(responseMockData)

    return SpotClient.cancelOCOOrder(symbol, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
