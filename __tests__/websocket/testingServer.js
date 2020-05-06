const WebSocket = require('ws')

const wsServer = new WebSocket.Server({ port: 9000 })
console.log('server starts..')
console.log(wsServer.address())
wsServer.on('connection', ws => {
  console.log('New connection established.')
  ws.send('New connection established.')
  ws.on('message', function (message) {
    console.log('Message from the client')
    console.log(message)
  })
  ws.on('error', e => console.log(e))
  ws.on('close', function () {
    console.log('User was disconnected')
  })
})

wsServer.on('error', e => console.log('error', e))
