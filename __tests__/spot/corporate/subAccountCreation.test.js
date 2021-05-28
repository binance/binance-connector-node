/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow
} = require('../../testUtils/mockData')

describe('#subAccountCreation', () => {
  it.each([
    [undefined], [''], [null]
  ])('should throw MissingParameterError given missing subAccountString', (input) => {
    expect(() => {
      SpotClient.subAccountCreation(input)
    }).toThrow(MissingParameterError)
  })

  it('should create a new virtual sub-account', () => {
    const subAccountString = 'new_virtual_account'
    const parameters = {
      subAccountString,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/virtualSubAccount${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountCreation(subAccountString, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
