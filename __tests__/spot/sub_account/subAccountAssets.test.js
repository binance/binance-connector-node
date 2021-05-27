/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountAssets', () => {
  describe('throw MissingParameterError', () => {
    it('missing email', async () => {
      expect(() => {
        SpotClient.subAccountAssets('')
      }).toThrow(MissingParameterError)
    })
  })

  it('should query sub account assets', async () => {
    const parameters = {
      email,
      recvWindow
    }

    nockMock(`/sapi/v3/sub-account/assets?${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountAssets(email, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
