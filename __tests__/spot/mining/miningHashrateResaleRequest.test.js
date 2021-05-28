/* global describe, it, expect, */
const MissingParameterError = require('../../../src/error/missingParameterError')

const {
  nockPostMock,
  responseMockData,
  SpotClient
} = require('../../testUtils/testSetup')

const {
  queryString
} = require('../../testUtils/mockData')

const algo = 'sha256'
const userName = 'minerName'
const userName2 = 'minerName2'
const startDate = 1617659086000
const endDate = 1617659096000
const hashRate = 100000000

describe('#miningHashrateResaleRequest', () => {
  it.each`
  userName | algo | startDate | endDate | toPoolUser | hashRate
  ${''} | ${''} | ${''} | ${''} | ${''} | ${''}
  ${undefined} | ${undefined} | ${undefined} | ${undefined} | ${undefined} | ${undefined}
  ${''} | ${algo} | ${startDate} | ${endDate} | ${userName2} | ${hashRate}
  ${userName} | ${''} | ${startDate} | ${endDate} | ${userName2} | ${hashRate}
  ${userName} | ${algo} | ${''} | ${endDate} | ${userName2} | ${hashRate}
  ${userName} | ${algo} | ${startDate} | ${''} | ${userName2} | ${hashRate}
  ${userName} | ${algo} | ${startDate} | ${endDate} | ${''} | ${hashRate}
  ${userName} | ${algo} | ${startDate} | ${endDate} | ${userName2} | ${''}
  `('missing algo', () => {
    expect(() => {
      SpotClient.miningHashrateResaleRequest('', userName)
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
    nockPostMock(`/sapi/v1/mining/hash-transfer/config${queryString(parameters)}`)(responseMockData)

    return SpotClient.miningHashrateResaleRequest(userName, algo, startDate, endDate, userName2, hashRate)
      .then(response => {
        expect(response).toBeDefined()
        expect(response.data).toEqual(responseMockData)
      })
  })
})
