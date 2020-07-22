/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockPostMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString,
  projectId,
  lot
} = require('../../testUtils/mockData')

describe('#savingsPurchaseCustomizedProject', () => {
  describe('throw MissingParameterError', () => {
    it('missing projectId', async () => {
      expect(() => {
        SpotClient.savingsPurchaseCustomizedProject('', lot)
      }).toThrow(MissingParameterError)
    })

    it('missing lot', async () => {
      expect(() => {
        SpotClient.savingsPurchaseCustomizedProject(projectId, '')
      }).toThrow(MissingParameterError)
    })
  })
  it('should return purchaseId', async () => {
    nockPostMock(`/sapi/v1/lending/customizedFixed/purchase${queryString({ projectId, lot })}`)(responseMockData)

    return SpotClient.savingsPurchaseCustomizedProject(projectId, lot).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
