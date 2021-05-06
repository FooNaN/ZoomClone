import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:4000');

function joinIn(userId, ROOM_ID) {
    socket.emit('join-room', ROOM_ID, userId)
}

export { joinIn };