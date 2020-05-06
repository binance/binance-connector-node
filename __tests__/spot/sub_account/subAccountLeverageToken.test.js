/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow,
  email
} = require('../../testUtils/mockData')

describe('#subAccountLeverageToken', () => {
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

    nockPostMock(`/sapi/v1/sub-account/blvt/enable?${buildQueryString({ ...parameters })}`)(mockResponse)

    return SpotClient.subAccountLeverageToken(email, enableBlvt, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
