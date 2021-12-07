/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { nockMock, buildQueryString, SpotClient } = require('../../testUtils/testSetup')

const { mockResponse, email, recvWindow } = require('../../testUtils/mockData')
const subAccountApiKey = 'subAccountApiKey'

describe('#subAccountApiGetIpRestriction', () => {
  it.each(
    [['', subAccountApiKey],
      [email, '']
    ]
  )('should throw MissingParameterError when missing parameters', (pEmail, pSubAccountApiKey) => {
    expect(() => {
      SpotClient.subAccountApiGetIpRestriction(pEmail, pSubAccountApiKey)
    }).toThrow(MissingParameterError)
  })

  it('should get IP Restriction for a Sub-account API Key (For Master Account)', () => {
    const parameters = {
      email,
      subAccountApiKey,
      recvWindow
    }
    nockMock(`/sapi/v1/sub-account/subAccountApi/ipRestriction?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.subAccountApiGetIpRestriction(email, subAccountApiKey, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
