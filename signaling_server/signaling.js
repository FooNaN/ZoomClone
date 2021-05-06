const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.json());

/**
 * Class for handling which rooms exist and which users are in them
 */
class RoomHandler {
    /**
     * Class constructor
     */
    constructor() {
        this.rooms = new Map();  // all available rooms and users in them
    }

    /**
     * Create new room
     * @param roomId
     * @returns true if room didn't exist, false otherwise
     */
     createRoom(roomId) {
        if (this.rooms.has(roomId)) {
            return false;
        }
        this.rooms.set(roomId, new Set());
        return true;
    }

    /**
     * Delete existing room
     * @param roomId
     * @returns true if room existed, false otherwise
     */
    deleteRoom(roomId) {
        if (!this.rooms.has(roomId)) {
            return false;
        }
        this.rooms.delete(roomId);
        return true;
    }

    /**
     * Add user to room
     * @param userId
     * @param roomId
     * @returns true if user didn't exist and room existed, false otherwise
     */
    addUser(userId, roomId) {
        if (!this.rooms.has(roomId) || this.rooms.get(roomId).has(userId)) {
            return false;
        }
        this.rooms.get(roomId).add(userId);
        return true;
    }

    /**
     * Remove user from room
     * @param userId
     * @param roomId
     * @returns true if user and room existed, false otherwise
     */
    removeUser(userId, roomId) {
        if (!this.rooms.has(roomId) || !this.rooms.get(roomId).has(userId)) {
            return false;
        }
        this.rooms.get(roomId).add(userId);
        return true;
    }

    /**
     * Check if user has access to room
     * @param userId
     * @param roomId
     * @returns true if user has access, false otherwise
     */
    hasAccess(userId, roomId) {
        return this.rooms.has(roomId) && this.rooms.get(roomId).has(userId);
    }
}

let rooms = new RoomHandler();

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
 *     operation_status: <int>
 * }
 *
 * Status codes:
 * 0 == room successfully created
 * 1 == room already exists
 */
app.post("/api/signaling/create_room", (req, res) => {
    let roomId = req.body["room_id"];

    // try to create room
    if (rooms.createRoom(roomId)) {
        // success
        console.log(`Room ${roomId} successfully created`)
        res.send({"operation_status": 0});
    } else {
        // fail
        console.log(`Room ${roomId} failed to create`)
        res.send({"operation_status": 1});
    }
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
 *     operation_status: <int>
 * }
 *
 * Status codes:
 * 0 == user successfully added
 * 1 == user is already in the room or the room doesn't exist
 */
app.post("/api/signaling/connect_user", (req, res) => {
    let userId = req.body["user_id"];
    let roomId = req.body["room_id"];

    // try to add user
    if (rooms.addUser(userId, roomId)) {
        // success
        console.log(`User ${userId} added to room ${roomId}`)
        res.send({"operation_status": 0});
    } else {
        // fail
        console.log(`User ${userId} failed to be added to room ${roomId}`)
        res.send({"operation_status": 1});
    }
})

/**
 * socket.io listener
 */
io.on("connection", socket => {
    socket.on("join-room", (roomId, userId) => {
        if (rooms.hasAccess(userId, roomId)) {
            console.log(`SocketIO: User ${userId} connected to room ${roomId}`)
            socket.join(roomId);
            socket.to(roomId).broadcast.emit("user-connected", userId);

            socket.on("disconnect", () => {
                socket.to(roomId).broadcast.emit("user-disconnected", userId);
            });
        } else {
            console.log(`SocketIO: User ${userId} denied connection to room ${roomId}`)
        }
    });
});

// server runs at localhost:4000
server.listen(4000);
