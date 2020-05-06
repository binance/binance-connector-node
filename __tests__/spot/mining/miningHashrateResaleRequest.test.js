/* global describe, it, expect */
const MissingParameterError = require('../../../src/error/missingParameterError')
const {
  nockPostMock,
  buildQueryString,
  SpotClient
} = require('../../testUtils/testSetup')
const { mockResponse } = require('../../testUtils/mockData')

const algo = 'sha256'
const userName = 'minerName'
const userName2 = 'minerName2'
const startDate = 1617659086000
const endDate = 1617659096000
const hashRate = 100000000

describe('#miningHashrateResaleRequest', () => {
  it.each`
  pUserName | pAlgo | pStartDate | pEndDate | pToPoolUser | pHashRate
  ${''} | ${''} | ${''} | ${''} | ${''} | ${''}
  ${undefined} | ${undefined} | ${undefined} | ${undefined} | ${undefined} | ${undefined}
  ${''} | ${algo} | ${startDate} | ${endDate} | ${userName2} | ${hashRate}
  ${userName} | ${''} | ${startDate} | ${endDate} | ${userName2} | ${hashRate}
  ${userName} | ${algo} | ${''} | ${endDate} | ${userName2} | ${hashRate}
  ${userName} | ${algo} | ${startDate} | ${''} | ${userName2} | ${hashRate}
  ${userName} | ${algo} | ${startDate} | ${endDate} | ${''} | ${hashRate}
  ${userName} | ${algo} | ${startDate} | ${endDate} | ${userName2} | ${''}
  `('missing parameter', ({ pUserName, pAlgo, pStartDate, pEndDate, pToPoolUser, pHashRate }) => {
    expect(() => {
      SpotClient.miningHashrateResaleRequest(pUserName, pAlgo, pStartDate, pEndDate, pToPoolUser, pHashRate)
    }).toThrow(MissingParameterError)
  })

  it('should establish hashrate resale request', () => {
    const parameters = {
      userName,
      algo,
      startDate,
      endDate,
      hashRate,
      toPoolUser: userName2
    }
    nockPostMock(`/sapi/v1/mining/hash-transfer/config?${buildQueryString(parameters)}`)(mockResponse)

    return SpotClient.miningHashrateResaleRequest(userName, algo, startDate, endDate, userName2, hashRate)
      .then(response => {
        expect(response).toBeDefined()
        expect(response.data).toEqual(mockResponse)
      })
  })
})
