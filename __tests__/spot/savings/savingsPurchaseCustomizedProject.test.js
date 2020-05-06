/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockPostMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  mockResponse,
  projectId,
  lot
} = require('../../testUtils/mockData')

describe('#savingsPurchaseCustomizedProject', () => {
  describe('throw MissingParameterError', () => {
    it('missing projectId', () => {
      expect(() => {
        SpotClient.savingsPurchaseCustomizedProject('', lot)
      }).toThrow(MissingParameterError)
    })

    it('missing lot', () => {
      expect(() => {
        SpotClient.savingsPurchaseCustomizedProject(projectId, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return purchaseId', () => {
    nockPostMock(`/sapi/v1/lending/customizedFixed/purchase?${buildQueryString({ projectId, lot })}`)(mockResponse)

    return SpotClient.savingsPurchaseCustomizedProject(projectId, lot).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
