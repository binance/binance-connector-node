/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const { mockResponse, email, recvWindow } = require('../../testUtils/mockData')
const subAccountApiKey = 'subAccountApiKey'
const ipRestrict = true

describe('#subAccountApiToggleIpRestriction', () => {
  it.each(
    [['', subAccountApiKey, ipRestrict],
      [email, '', ipRestrict],
      [email, subAccountApiKey, '']
    ]
  )('should throw MissingParameterError when missing parameters', (pEmail, pSubAccountApiKey, pIpRestrict) => {
    expect(() => {
      SpotClient.subAccountApiToggleIpRestriction(pEmail, pSubAccountApiKey, pIpRestrict)
    }).toThrow(MissingParameterError)
  })

  it('should Enable or Disable IP Restriction for a Sub-account API Key', () => {
    const parameters = {
      email,
      subAccountApiKey,
      ipRestrict,
      recvWindow
    }
    nockPostMock(`/sapi/v1/sub-account/subAccountApi/ipRestriction?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.subAccountApiToggleIpRestriction(email, subAccountApiKey, ipRestrict, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
