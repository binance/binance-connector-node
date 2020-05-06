/* global describe, it, expect */
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')
const MissingParameterError = require('../../../src/error/missingParameterError')

const { mockResponse, recvWindow } = require('../../testUtils/mockData')
const type = 'MAIN_C2C'
const asset = 'BNB'
const amount = 1

describe('#userUniversalTransfer', () => {
  it.each`
  pType        | pAsset       | pAmount
  ${''}        | ${''}        | ${''}
  ${undefined} | ${undefined} | ${undefined}
  ${''}        | ${asset}     | ${amount}
  ${type}      | ${''}        | ${amount}
  ${type}      | ${asset}     | ${''}
  `('should throw MissingParameterError when missing parameters',
    ({ pType, pAsset, pAmount }) => {
      expect(() => {
        SpotClient.userUniversalTransfer(pType, pAsset, pAmount)
      }).toThrow(MissingParameterError)
    })

  it('should transfer the asset', () => {
    const parameters = {
      recvWindow
    }
    nockPostMock(`/sapi/v1/asset/transfer?${buildQueryString({ type, asset, amount, ...parameters })}`)(mockResponse)

    return SpotClient.userUniversalTransfer(type, asset, amount, parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
