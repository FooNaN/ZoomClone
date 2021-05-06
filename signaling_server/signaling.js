const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
});

app.use(express.json());

/** Class for handling which rooms exist and which users are in them */
class RoomHandler {
    #logging
    #rooms

    /**
     * Class constructor
     * @param {boolean} logging - whether or not to log events (default=false)
     */
    constructor(logging=false) {
        this.#logging = logging;
        this.#rooms = new Map();  // all available rooms and users in them
    }

    /**
     * Log message into console (if logging is enabled)
     * @param {string} message - message to put into console
     * @param {string} prefix
     */
    #log(message, prefix="RoomHandler: ") {
        if (this.#logging) console.log(prefix + message);
    }

    /**
     * Create new room
     * @param {string} roomId
     * @returns {number} operation status
     */
     createRoom(roomId) {
        if (this.#rooms.has(roomId)) {
            this.#log(`Failed to create room ${roomId} - it already exists`)
            return 1; // 1 == room already exists
        }
        this.#rooms.set(roomId, new Set());
        this.#log(`Create room ${roomId}`)
        return 0; // 0 == room successfully created
    }

    /**
     * Delete existing room
     * @param {string} roomId
     * @returns {number} operation status
     */
    deleteRoom(roomId) {
        if (!this.#rooms.has(roomId)) {
            this.#log(`Failed to delete room ${roomId} - it doesn't exist`)
            return 1; // 1 == room doesn't exist
        }
        this.#rooms.delete(roomId);
        this.#log(`Delete room ${roomId}`)
        return 0; // 0 == room successfully deleted
    }

    /**
     * Add user to room
     * @param {string} userId
     * @param {string} roomId
     * @returns {number} operation status
     */
    addUser(userId, roomId) {
        if (!this.#rooms.has(roomId)) {
            this.#log(`Failed to add user ${userId} to room ${roomId} - the room doesn't exist`)
            return 1; // 1 == the room doesn't exist
        }
        if (this.#rooms.get(roomId).has(userId)) {
            this.#log(`Failed to add user ${userId} to room ${roomId} - user is already in the room`)
            return 2; // 2 == user is already in the room
        }
        this.#rooms.get(roomId).add(userId);
        this.#log(`Add user ${userId} to room ${roomId}`)
        return 0; // 0 == user successfully added
    }

    /**
     * Remove user from room
     * @param {string} userId
     * @param {string} roomId
     * @returns {number} operation status
     */
    removeUser(userId, roomId) {
        if (!this.#rooms.has(roomId)) {
            this.#log(`Failed to remove user ${userId} from room ${roomId} - the room doesn't exist`)
            return 1; // 1 == the room doesn't exist
        }
        if (!this.#rooms.get(roomId).has(userId)) {
            this.#log(`Failed to remove user ${userId} from room ${roomId} - user isn't in the room`)
            return 2; // 2 == user isn't in the room
        }
        this.#rooms.get(roomId).add(userId);
        this.#log(`Remove user ${userId} from room ${roomId}`)
        return 0; // 0 == user successfully removed
    }

    /**
     * Check if user has access to room
     * @param {string} userId
     * @param {string} roomId
     * @returns {boolean} true if user has access, false otherwise
     */
    hasAccess(userId, roomId) {
        return this.#rooms.has(roomId) && this.#rooms.get(roomId).has(userId);
    }
}

/** Room handler */
let rooms = new RoomHandler(true);

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

    // try to create room and send result back
    res.send({"operation_status": rooms.createRoom(roomId)})
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
 * 1 == the room doesn't exist
 * 2 == user is already in the room
 */
app.post("/api/signaling/connect_user", (req, res) => {
    let userId = req.body["user_id"];
    let roomId = req.body["room_id"];

    // try to add user and send result back
    res.send({"operation_status": rooms.addUser(userId, roomId)});
})

/** Socket.IO listener */
io.on("connection", socket => {
    socket.on("join-room", (userId, roomId) => {
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

/** Server running at localhost:4000 */
server.listen(4000);
