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
function getIo() {
  if (!io) {
    throw new Error('Must call initSocketServer first')
  }
  return io
}

module.exports = {
  getIo,
  initSocketServer
}
