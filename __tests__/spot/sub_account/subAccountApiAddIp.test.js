/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const { mockResponse, email, recvWindow } = require('../../testUtils/mockData')
const subAccountApiKey = 'subAccountApiKey'
const ipAddress = '1.2.3.4'

describe('#subAccountApiAddIp', () => {
  it.each(
    [['', subAccountApiKey, ipAddress],
      [email, '', ipAddress],
      [email, subAccountApiKey, '']
    ]
  )('should throw MissingParameterError when missing parameters', (pEmail, pSubAccountApiKey, pIpAddress) => {
    expect(() => {
      SpotClient.subAccountApiAddIp(pEmail, pSubAccountApiKey, pIpAddress)
    }).toThrow(MissingParameterError)
  })

  it('should add IP for a Sub-account API Key', () => {
    const parameters = {
      email,
      subAccountApiKey,
      ipAddress,
      recvWindow
    }
    nockPostMock(`/sapi/v1/sub-account/subAccountApi/ipRestriction/ipList?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.subAccountApiAddIp(email, subAccountApiKey, ipAddress, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
