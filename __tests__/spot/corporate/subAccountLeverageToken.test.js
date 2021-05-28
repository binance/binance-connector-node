/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

const {
  queryString,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountAssets', () => {
  it.each([
    [undefined, undefined], ['', ''], [null, null],
    [undefined, true], ['', false], ['test@123.com', null]
  ])('should throw MissingParameterError given missing params', (email, enableBlvt) => {
    expect(() => {
      SpotClient.subAccountLeverageToken(email, enableBlvt)
    }).toThrow(MissingParameterError)
  })

  it('should query sub account assets', () => {
    const enableBlvt = true
    const parameters = {
      email,
      enableBlvt,
      recvWindow
    }

    nockPostMock(`/sapi/v1/sub-account/blvt/enable${queryString({ ...parameters })}`)(responseMockData)

    return SpotClient.subAccountLeverageToken(email, enableBlvt, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
