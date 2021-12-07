/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockDeleteMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const { mockResponse, email, recvWindow } = require('../../testUtils/mockData')
const subAccountApiKey = 'subAccountApiKey'
const ipAddress = '1.2.3.4'

describe('#subAccountApiDeleteIp', () => {
  it.each(
    [['', subAccountApiKey, ipAddress],
      [email, '', ipAddress],
      [email, subAccountApiKey, '']
    ]
  )('should throw MissingParameterError when missing parameters', (pEmail, pSubAccountApiKey, pIpAddress) => {
    expect(() => {
      SpotClient.subAccountApiDeleteIp(pEmail, pSubAccountApiKey, pIpAddress)
    }).toThrow(MissingParameterError)
  })

  it('should delete IP for a Sub-account API Key', () => {
    const parameters = {
      email,
      subAccountApiKey,
      ipAddress,
      recvWindow
    }
    nockDeleteMock(`/sapi/v1/sub-account/subAccountApi/ipRestriction/ipList?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.subAccountApiDeleteIp(email, subAccountApiKey, ipAddress, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
