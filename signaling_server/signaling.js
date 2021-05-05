const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')

let rooms = new Map();  // all available rooms and users in them

/**
 * Create new room
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
 * Delete existing room
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
 * Add user to room
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
 * Remove user from room
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

/**
 * API for room creation
 *
 * Input JSON structure:
 * {
 *     room_id: <string>
 * }
 *
 * Output JSON structure:
 * {
 *     status: <int>
 * }
 *
 * Status codes:
 * 0 == room successfully created
 * 1 == room already exists
 */
app.post('/api/signaling/create_room', (req, res) => {
    console.log(req.body) // placeholder
})

/**
 * API for adding user to room
 *
 * Input JSON structure:
 * {
 *     user_id: <string>
 *     room_id: <string>
 * }
 *
 * Output JSON structure:
 * {
 *     status: <int>
 * }
 *
 * Status codes:
 * 0 == user successfully added
 * 1 == user already in the room
 * 2 == room doesn't exist
 */
app.post('/api/signaling/add_user', (req, res) => {
    console.log(req.body) // placeholder
})

/**
 * socket.io listener
 */
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
