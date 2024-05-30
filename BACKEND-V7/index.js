/* eslint-disable space-before-function-paren */
require('dotenv').config()
require('./src/database')
const app = require('./src/app')
const { initSocketServer } = require('./src/utils')

async function main() {
  const server = await app.listen(app.get('port'))
  const io = initSocketServer(server)
  console.log('Server on port', app.get('port'))

  io.sockets.on('connection', (socket) => {
    console.log('NUEVO USUARIO CONECTADO')

    socket.on('disconnect', () => {
      console.log('USUARIO DESCONECTADO')
    })

    socket.on('subscribe', (room) => {
      socket.join(room)
    })

    socket.on('unsubscribe', (room) => {
      socket.leave(room)
    })
  })
}

main()
