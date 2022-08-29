'use strict'

const Spot = require('../../../src/spot')

const apiKey = ''
const apiSecret = ''
const client = new Spot(apiKey, apiSecret)

client.stakingRedeemProduct('STAKING', 'Axs*90', {
  recvWindow: 5000
})
  .then(response => client.logger.log(response.data))
  .catch(error => client.logger.error(error))
