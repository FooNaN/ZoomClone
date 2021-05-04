const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')


// socket.io listener
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)
    })
})

// server runs at port 3000
server.listen(3000)
