/* eslint-disable space-before-function-paren */
const SocketServer = require('socket.io').Server

let io = null

function initSocketServer(server) {
  io = new SocketServer(server, {
    cors: {
      origin: '*'
    }
  })
  return io
}

module.exports = {
  initSocketServer
}
