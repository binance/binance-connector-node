const Spot = require('../../../src/spot')

const client = new Spot()

client.systemStatus().then(response => console.log(response.data))
  .catch(error => console.log(error))
