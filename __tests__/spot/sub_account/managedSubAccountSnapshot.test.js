/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const { buildQueryString, SpotClient, nockMock } = require('../../testUtils/testSetup')

const {
  mockResponse,
  recvWindow
} = require('../../testUtils/mockData')

const email = 'alice@test.com'
const type = 'SPOT'

describe('#managedSubAccountSnapshot', () => {
  it.each(
    [['', type],
      [email, '']
    ]
  )('should throw MissingParameterError when missing parameters', (pEmail, pType) => {
    expect(() => {
      SpotClient.managedSubAccountSnapshot(pEmail, pType)
    }).toThrow(MissingParameterError)
  })

  it('should snapshot managed sub account', () => {
    const parameters = {
      email,
      type,
      recvWindow
    }
    nockMock(`/sapi/v1/managed-subaccount/accountSnapshot?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.managedSubAccountSnapshot(email, type, { recvWindow }).then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(mockResponse)
    })
  })
})
