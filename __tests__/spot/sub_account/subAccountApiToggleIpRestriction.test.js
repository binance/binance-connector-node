/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockPostMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const { mockResponse, email, recvWindow } = require('../../testUtils/mockData')
const subAccountApiKey = 'subAccountApiKey'
const status = '1'

describe('#subAccountApiToggleIpRestriction', () => {
  it.each(
    [['', subAccountApiKey, status],
      [email, '', status],
      [email, subAccountApiKey, '']
    ]
  )('should throw MissingParameterError when missing parameters', (pEmail, pSubAccountApiKey, pStatus) => {
    expect(() => {
      SpotClient.subAccountApiToggleIpRestriction(pEmail, pSubAccountApiKey, pStatus)
    }).toThrow(MissingParameterError)
  })

  it('should Enable or Disable IP Restriction for a Sub-account API Key', () => {
    const parameters = {
      email,
      subAccountApiKey,
      status,
      recvWindow
    }
    nockPostMock(`/sapi/v2/sub-account/subAccountApi/ipRestriction?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.subAccountApiToggleIpRestriction(email, subAccountApiKey, status, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
