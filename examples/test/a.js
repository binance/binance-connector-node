const Spot = require('../../src/spot')

const client = new Spot('', '')

setInterval(function () {
  // client.marginTransfer('bnb', 0.1,1).then(response => console.log(response))
  //   .catch(error => console.log(error))
  client.marginRepay('usdt', 0.1).then(response => console.log(response))
    .catch(error => console.log(error))
  // client.marginRepay('usdt', 0.1).then(response => console.log(response))
  //   .catch(error => console.log(error))
}, 2000)
