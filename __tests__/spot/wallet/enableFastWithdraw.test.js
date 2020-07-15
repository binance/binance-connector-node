/* global describe, it, expect, */
const { nockPostMock, responseMockData, SpotClient } = require('../../testUtils/testSetup')

describe('#enableFastWithdraw', () => {
  it('should return success', async () => {
    nockPostMock('/sapi/v1/account/enableFastWithdrawSwitch')(responseMockData)

    return SpotClient.enableFastWithdraw().then(response => {
      expect(response).toBeDefined()
      expect(response.data).toEqual(responseMockData)
    })
  })
})
