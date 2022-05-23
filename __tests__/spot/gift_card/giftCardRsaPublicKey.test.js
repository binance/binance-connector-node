/* global describe, it, expect */
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

describe('#giftCardRsaPublicKey', () => {
  it('should fetch rsa public key without parameter attached', () => {
    nockMock('/sapi/v1/giftcard/cryptography/rsa-public-key')(mockResponse)
    return SpotClient.giftCardRsaPublicKey().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })

  it('should fetch rsa public key', () => {
    const parameters = {
      recvWindow
    }
    nockMock(`/sapi/v1/giftcard/cryptography/rsa-public-key?${buildQueryString({ ...parameters })}`)(mockResponse)
    return SpotClient.giftCardRsaPublicKey(parameters).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
