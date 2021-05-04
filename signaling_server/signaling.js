const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')

let rooms = new Map();  // all available rooms and users in them

/**
 * create new room
 * @param roomId
 * @returns true if room didn't exist, false otherwise
 */
function createRoom(roomId) {
    if (rooms.has(roomId)) {
        return false
    }
    rooms.set(roomId, new Set())
    return true
}

/**
 * delete existing room
 * @param roomId
 * @returns true if room existed, false otherwise
 */
function deleteRoom(roomId) {
    if (!rooms.has(roomId)) {
        return false
    }
    rooms.delete(roomId)
    return true
}

/**
 * add user to room
 * @param roomId
 * @param userId
 * @returns true if user didn't exist and room existed, false otherwise
 */
function addUser(roomId, userId) {
    if (!rooms.has(roomId) || rooms.get(roomId).has(userId)) {
        return false
    }
    rooms.get(roomId).add(userId)
    return true
}

/**
 * remove user from room
 * @param roomId
 * @param userId
 * @returns true if user and room existed, false otherwise
 */
function removeUser(roomId, userId) {
    if (!rooms.has(roomId) || !rooms.get(roomId).has(userId)) {
        return false
    }
    rooms.get(roomId).add(userId)
    return true
}

app.post('/api/signaling/create_room', (req, res) => {
    console.log(req.body) // placeholder
})

// socket.io listener
io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).broadcast.emit('user-connected', userId)

        socket.on('disconnect', () => {
            socket.to(roomId).broadcast.emit('user-disconnected', userId)
        })
    })
})

// server runs at port 3000
server.listen(3000)
