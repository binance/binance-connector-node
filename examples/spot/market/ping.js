'use strict'

const Spot = require('../../../src/spot')

const client = new Spot()

client.ping().then(response => client.logger.log(response.data))
