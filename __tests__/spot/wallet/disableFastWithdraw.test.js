/* global describe, it, expect, */
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#disableFastWithdraw', () => {
  it('should return success', () => {
    nockPostMock('/sapi/v1/account/disableFastWithdrawSwitch')(responseMockData)

    return SpotClient.disableFastWithdraw().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
